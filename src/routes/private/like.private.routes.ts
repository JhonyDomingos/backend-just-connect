import express from 'express';
import { CommentScoreController } from '../../controllers/score/LikeCommentController';

const router = express.Router();
const commentScoreController = new CommentScoreController();

// Rota para curtir um comentário
router.post('/comments/:commentId/like', commentScoreController.likeComment);

// Rota para descurtir um comentário
router.delete('/comments/:commentId/like', commentScoreController.removeLike);

export default router;