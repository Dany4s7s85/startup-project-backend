import express from 'express';
import {signup,singIn,forgotPassword,resetPassword} from "./../../controllers/authController.js"
import {getAllUsers,getUser,deleteUser,deActivateUser} from "./../../controllers/usersController.js"

/**
 * User routes
 */


const router = express.Router();

router.post('/signup',signup)
      .post('/signin',singIn)
      .post('/forgotPassword', forgotPassword)
      .put('/resetPassword/:token', resetPassword)

router.route('/').get(getAllUsers)
router.route('/:uuid').get(getUser).put(deActivateUser).delete(deleteUser)

export default router;
