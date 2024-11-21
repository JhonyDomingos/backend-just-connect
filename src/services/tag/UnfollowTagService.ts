import { AppError } from "../../Error/AppError.error";
import prismaClient from "../../prisma";

class UnfollowTagService {
  async execute(tag: string, userId: string): Promise<void> {
    const findTag = await prismaClient.tag.findUnique({ where: { tag } });

    const existingFollow = await prismaClient.tagFollow.findFirst({
      where: {
        user_id: userId,
        tag_id: findTag.id,
      },
    });

    if (!existingFollow) {
      throw new AppError("User is not following this tag");
    }

    await prismaClient.tagFollow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  }
}

export { UnfollowTagService };
