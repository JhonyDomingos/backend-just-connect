import { AppError } from "../../Error/AppError.error";
import { FollowTagData } from "../../interfaces/tag/TagTypes";
import prismaClient from "../../prisma";

class FollowTagService {
  async execute(tag: string, userId: string): Promise<FollowTagData> {
    const findTag = await prismaClient.tag.findUnique({ where: { tag } });

    const existingFollow = await prismaClient.tagFollow.findFirst({
      where: {
        user_id: userId,
        tag_id: findTag.id,
      },
    });

    if (existingFollow) {
      throw new AppError("User is already following this tag");
    }

    const followTag = await prismaClient.tagFollow.create({
      data: {
        tag_id: findTag.id,
        user_id: userId,
      },
    });

    return followTag;
  }
}

export { FollowTagService };
