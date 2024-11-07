import { Router } from 'express';
import { AuthService } from '../../services/auth/AuthService';
import { sendPasswordResetEmail } from '../../services/auth/EmailService';

const forgotPasswordRoutes: Router = Router();
const authService = new AuthService();

forgotPasswordRoutes.post('/forgot-password', async (req, res, next) => {
    const { email } = req.body;
    try {
        const resetToken = await authService.generateResetToken(email);
        await sendPasswordResetEmail(email, resetToken);
        res.send('Password reset email sent');
    } catch (err) {
        next(err);
    }
});

export { forgotPasswordRoutes };



