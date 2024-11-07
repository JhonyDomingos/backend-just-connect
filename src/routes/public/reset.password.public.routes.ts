import { Router } from 'express';
import { AuthService } from '../../services/auth/AuthService';

const resetPasswordRoutes: Router = Router();
const authService = new AuthService();

resetPasswordRoutes.post('/reset-password', async (req, res, next) => {
    const { newPassword } = req.body;
    const { token } = req.query.token as { token: string };

    try {
        await authService.resetPassword(token, newPassword);
        res.send('Password has been reset');
    } catch (err) {
        next(err);
    }
});

export { resetPasswordRoutes };

