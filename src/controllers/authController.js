import model from '../database/models/index.js';
import bcrypt from "bcryptjs"
import catchAsync from "../utils/catchAsync.js"
import AppError from '../utils/appError.js'
import jwt from "jsonwebtoken"
import sgMail from "@sendgrid/mail";
import crypto from 'crypto'
import config from '../config/config.js';
import * as  send from '../utils/email.js'
import {promisify} from "util"


const User = model.User;
/**
 * jwt token generator function
 */

const signToken =(uuid)=>{
  return jwt.sign({uuid},process.env.JWT_SECRETE,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })
}

/**
 * Register user API
 */

export const signup = async(req,res,next)=>{
  
  try {
   
    /**
    *   Taking information from user request
    */

    const {firstName,lastName,email,password,devType} = req.body
    
    /**
     * Verifying all necessary information are supplied
     */

    if(!firstName||!lastName||!email||!password||!devType){
      return res.status(400).json({
        status:"fail",
        message:"Invalid request, Provide valid information"
      })
    }
   
    /**
     *  Check if a user is already existing
     */
 
    const user = await User.findOne({where:{email}})

    if(user){
    return res.status(403).json({
      status:"fail",
      message:"User already exist"
    })
    }
   
    /**
     * Creating a new user
     */

    const newUser = await User.create({
      firstName,
      lastName,
      devType,
      email,
      password:await bcrypt.hash(password,12)
    })

  /**
   * Send back user information
   */

    res.status(201).json({
      status:"success",
      data:{
        users:newUser
      }
    })

  } catch (error) {
    res.status(500).json({
      status:"fail",
      message:"Error while creating a user",
      err:error.message,
    })
   
  }
}


/**
 * Signin a registered user
 */


export const singIn = async(req,res,next)=>{

  try{

   /**
    * Taking email and password from user
    */

    const {email,password} = req.body

    /**
     * Check if email and password are not empty
     */

    if(!email||!password){
      return res.status(400).json({
        status:"fail",
        message:"Invalid data supplied"
      })
    }
    
    /**
     * Get user based on his or her email
     */
    const user = await User.findOne({where:{email}})
    
   /**
    * Check if user's email or password are correct 
    * then throw error if not correct
    */

    if(!user||!( await bcrypt.compare(password,user.password))){
      return res.status(403).json({
        status:"fail",
        message:"Invalid email or password"
      })
    }
    
    /**
     * Generatin a token 
     * for successful logged In user
     */

    const Token = signToken(user.uuid)
    
    /**
     * Send back user token along with the user
     */

    res.status(200).json({
      status:"success",
      message:"Loggged In successfully!!",
      token:Token,
      data:{
        user
      }
    })

    /**
     * Send back error if login is not successfully done
     */

  }catch(error){
    res.status(403).json({
      status:"fail",
      message:"Error while sing in user",
      err:error.message
    })
   
  }

}
/**
 * forgot password api
 */
 const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  let passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')
  let passwordResetExpires = Date.now()+10*60*1000
  
  return resetToken
 }

export const forgotPassword =  catchAsync(async (req, res, next ) => {
  
  /**
 * Get user based on post email
 * Check if a user is already existing
 */

  const {email} = req.body

  const user = await User.findOne({where:{email}})


  if(!user){
      return next(new AppError("There is no user with that email address", 403))
  }

  /**
   * Generate random reset token
   */

  const resetToken = createPasswordResetToken()

  user.passwordResetToken = resetToken
  await user.save()

  /**
   * Send password reset link to user email address
   */
   const currentConfig = config[process.env.NODE_ENV];
   const { sendgridAPIKey, senderEmail } = currentConfig;

  const resetURL =`${req.protocol}://${req.get(
      'host'
      )}/api/v1/users/resetPassword/${resetToken}`
      const message =`Forgot your password? Submit a PATCH with your new password and passwordConfirm to:${resetURL}.\n
       If you didn't forget your password, please ignore this email.`
    
      sgMail.setApiKey(sendgridAPIKey);
      const msg = {
          to: `${email}`,
          from: `${senderEmail}`,
          subject: "Test Subject",
          text: 'Hello World!',
          html: `<strong>${resetURL}</strong>`,
      };

      sgMail.send(msg, function(err, info) {
          if (err) {
            return next(new AppError('There was an error sending the email. Try again later!', 500)) 
          } else {
            res.status(200).json({
                      status:'success',
                      message:'token sent to email'
                  })
          }
      });
  })

  export const resetPassword = catchAsync(async(req, res, next)=>{
  
    /**
    * Get new password
    * Get Reset Token
    */
   
    const {password} = req.body
    const Token  = req.params.token
    

    /**
     * Check if the new password or reset token are not null
     */

    if(!password||!Token){
      return next(new AppError("Invalid password or reset token",400))
    }
   
    /**
     * Get user based on token
     * Check if we can find user with provided token
     */
    
    const user = await User.findOne({
      where:{passwordResetToken:Token}
    })
   

    if(!user){
      return next(new AppError("User belongs to this token does not exist",401))
    }
    
    /**
     * Hash password before updating user password field
     */

     const hashedPassword = await bcrypt.hash(password,12)
     
     /**
      * Update user password field
      */
    user.password = hashedPassword
    user.passwordResetToken =""
    user.save()
   
    res.status(200).json({
    status: 'success',
    message: 'Password updated successfully!!!'
    })

    })


   /**
    * Updating user pasword just in case
    */ 

export const changePassword = catchAsync(async(req,res, next)=>{
  /**
   * Get token
   */

  const token = req.headers.authorization.split(" ")[1]
  
  if(!token){
    return next(new AppError("Loggin first",401))
  }

  /**
   *  verifying user token
   */

  const decoded = jwt.verify(token,process.env.JWT_SECRETE);

  /**
   * Get user by uuid from a decoded token
   */

  const uuid = decoded.uuid
  const user = await User.findOne({
    where:{uuid}
  })
 
  /**
   * Sending error message if not found with this token
   */

  if(!user){
   return next(new AppError("The user belongs to this token does not exist",401))
  }

  const {newPassword,oldPassword}  = req.body

})