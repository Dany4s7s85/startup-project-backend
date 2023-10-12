import dotenv from 'dotenv';
import model from '../database/models/index.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import {Op} from "sequelize"

const User = model.User;

dotenv.config();

/**
 *  Get All Users
 */

export  const getAllUsers = catchAsync(async(req, res,next) => {

  /**
   * Find All Users
   */

  const allUsers = await User.findAll({where:{
    isActive:{
      [Op.eq]:true
    }
  }})

  /**
   * send back all users
   */

  res.status(200).json({
    status:"success",
    result:allUsers.length,
    data:{
      users:allUsers
    }
  })
})

/**
 * Get user by id
 */

export const getUser = catchAsync(async(req,res,next)=>{
  
  /**
   *  Get user id
   */

  const uuid = req.params.uuid

  /**
   * Find user by uuid
   */
  const user = await User.findOne({where:{uuid}})
  
  if(!user){
    return next(new AppError("No User found with that ID",404))
  }
  
  res.status(200).json({
    status:"success",
    data:{
      user
    }
  })
})

/**
 * Delete user by id
 * Actualy it's all about inactivating user not deleting 
 */

export const deActivateUser = catchAsync(async(req,res,next)=>{

  /**
   * Get user uuid
   */

  const uuid = req.params.uuid
  
  /**
   * Check if user is there using provided uuid
   */

  const user = await User.findOne({where:{uuid}})
  
  /**
   * Provide message if user not found
   */

  if(!user){
   return next(new AppError("No user found with that ID",400))
  }
  
  user.isActive = false;
  await user.save()
  
  /**
   * send back a generic message to user
   */

  res.status(200).json({
   status:"success",
   message:"User deleted Successfully!!"
  })

})


/**
 * Delete user by id
 *  
 */

export const deleteUser = catchAsync(async(req, res,next)=>{
   /**
   * Get user uuid
   */

    const uuid = req.params.uuid

    /**
   * Check if user is there using provided uuid
   */

  const user = await User.findOne({where:{uuid}})
  
  /**
   * Provide message if user not found
   */

  if(!user){
   return next(new AppError("No user found with that ID",400))
  }
  
    /**
   * Delete user 
   */

  await user.destroy()
  
  /**
   * send back a generic message to user
   */

  res.status(200).json({
    status:"success",
    message:"User deleted Successfully",
  })

})