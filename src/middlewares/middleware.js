import {User} from "./../database/models"
import jwt from "jsonwebtoken"
import  {promisify} from "util"


export const protect = async(req,res,next)=>{

 try{
    let token;

    /**
     * Get  token from headers.authorization
     */

    if(req.headers.authorization.startsWith('Bearer')){
      token = headers.authorization.split(' ')[1]
    }

  /**
   * Check if there is a token
   */

    if(!token){
     return res.status(401).json({
       message:"You are not allowed to perform this action"
     })
    }

   /**
    * Verifying a token
    */

   const decoded = await promisify(jwt.verify)(token,process.env.JWT_SCRETE)
   
   /**
    * Get user from token information
    */

   const uuid = decoded.uuid

   const freshUser = await User.findOne({where:{uuid}})

   if(!freshUser){
     return res.status(401).json({
      message:"User belonging to this token does'nt exist"
     })
   }

   req.user = freshUser

  next()

 }catch(error){
  res.status(401).json({
    status:"fail",
    message:"Something went wrong"
  })
 }

}

