import { CreateUser } from '#/@types/user'
import { create, generateForgetPasswordLink, grantValid, sendReVerificationToken, signIn, updatePassword, verifyEmail } from '#/controllers/user'
import { isValidPassResetToken, mustAuth } from '#/middleware/auth'
import { validate } from '#/middleware/validator'
import { CreateUserSchema, SignInValidationSchema, TokenAndIDValidation, updatePasswordSchema } from '#/utils/validationSchema'
import { JWT_SECRET } from '#/utils/variables'
import { Router } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import User from "#/models/user"
const router = Router()

router.post("/create", validate(CreateUserSchema), create)
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail)
router.post("/re-verify-email", sendReVerificationToken)
router.post("/forget-password", generateForgetPasswordLink)
router.post("/verify-pass-reset-token", validate(TokenAndIDValidation), isValidPassResetToken, grantValid)
router.post('/update-password', validate(updatePasswordSchema), isValidPassResetToken, updatePassword)
router.post('/sign-in',
    validate(SignInValidationSchema),
    signIn)

router.get('/is-auth', mustAuth, (req, res) => {
    res.json({
        profile: req.user,

    })
}
)


export default router