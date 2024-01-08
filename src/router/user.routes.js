import express from 'express'
import { loginUser, registerUser,logoutUser,getDetail, refreshAccessToken, getCurrentUser, changeCurrentPassword, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannel, getHistory } from '../controllers/user.controllers.js'
import { upload } from '../middleware/multler.middleware.js'
import { verifyJwt } from '../middleware/auth.middleware.js'



const router =express.Router()


router.route("/register").post(
    upload.fields([
        {
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
 

//PROTECTED ROUTE
router.route('/logout').post(verifyJwt,logoutUser)
router.route('/refresh-tokn').post(verifyJwt,refreshAccessToken)
router.route('/current-user').get(verifyJwt,getCurrentUser)
router.route('/change-password').post(verifyJwt,changeCurrentPassword)
router.route('/update-account').patch(verifyJwt,updateAccountDetails)

router.route('/avatar').patch(verifyJwt,upload.single('avatar'),updateUserAvatar)
router.route('/cover-image').patch(verifyJwt,upload.single('coverImage'),updateUserCoverImage)

router.route('/c/:username').get(verifyJwt,getUserChannel)
router.route('/history').get(verifyJwt,getHistory)

export default router