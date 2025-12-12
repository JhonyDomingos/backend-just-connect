import { FollowTagData } from "../../interfaces/tag/TagTypes";
import {prismaClient} from "../../prisma";

class TagFollowService {
  async execute(tag: string, userId: string): Promise<FollowTagData | null> {
    const findTag = await prismaClient.tag.findUnique({ where: { tag } });

    const existingFollow = await prismaClient.tagFollow.findFirst({
      where: {
        user_id: userId,
        tag_id: findTag.id,
      },
    });

    if (existingFollow) {
      await prismaClient.tagFollow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return null;
    } else {
      const followTag = await prismaClient.tagFollow.create({
        data: {
          tag_id: findTag.id,
          user_id: userId,
        },
      });
      
      return followTag;
    }
  }
}

export { TagFollowService };
