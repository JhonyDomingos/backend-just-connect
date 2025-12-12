import {prismaClient} from "../../prisma";
import { ListTagData } from "../../interfaces/tag/TagTypes";
import { ListTagSchema } from "../../schemas/tagSchemas";

class ListTagsService {
  async findAll(): Promise<ListTagData> {
    const tags = await prismaClient.tag.findMany({
      select: {
        tag: true,
        posts: { select: { id: true } },
      },
    });

    const tagsWithPostsCount = tags.map((tag) => ({
        tag: tag.tag,
        postCount: tag.posts.length
    }));

    return ListTagSchema.parse(tagsWithPostsCount);
  }
}

export { ListTagsService };
