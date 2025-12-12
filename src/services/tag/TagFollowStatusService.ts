import { FollowTagData } from "../../interfaces/tag/TagTypes";
import {prismaClient} from "../../prisma";

class TagFollowStatusService {
  async execute(tag: string, userId: string): Promise<boolean> {
    const findTag = await prismaClient.tag.findUnique({ where: { tag } });

    const followStatus = await prismaClient.tagFollow.findFirst({
      where: {
        user_id: userId,
        tag_id: findTag.id,
      },
    });

    if (!followStatus) {
      return false;
    } else {
      return true;
    }
  }
}

export { TagFollowStatusService };
