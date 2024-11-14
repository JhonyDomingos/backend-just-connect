import prismaClient from '../../prisma';

class CommentScoreService {
  async likeComment(userId: string, commentId: string): Promise<boolean> {

    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comentário não encontrado.");
    }

    const alreadyLiked = await prismaClient.commentLike.findFirst({
      where: {
        user_id: userId,
        comment_id: commentId,
      },
    });

    if (alreadyLiked) {
      throw new Error("Você já curtiu este comentário!");
    }

    
    await prismaClient.commentLike.create({
      data: {
        user_id: userId,
        comment_id: commentId,
      },
    });

    
    await prismaClient.comment.update({
      where: { id: commentId },
      data: {
        score: {
          increment: 1,
        },
      },
    });

    return true;
  }

  async removeLike(userId: string, commentId: string): Promise<boolean> {
    
    const like = await prismaClient.commentLike.findFirst({
      where: {
        user_id: userId,
        comment_id: commentId,
      },
    });

    if (!like) {
      throw new Error("Você ainda não curtiu este comentário!");
    }

    
    await prismaClient.commentLike.delete({
      where: {
        id: like.id,
      },
    });

  
    await prismaClient.comment.update({
      where: { id: commentId },
      data: {
        score: {
          decrement: 1,
        },
      },
    });

    return true;
  }
}

export { CommentScoreService };