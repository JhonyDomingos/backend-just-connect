import prismaClient from "../../prisma";
import { listPostSchema } from "../../schemas/postSchemas";

class FindPostsByTagService {
  async tagged(tag: string) {
    const posts = await prismaClient.post.findMany({
      where: {
        tags: {
          some: { tag },
        },
      },
      include: {
        user: { select: { id: true, username: true } },
        tags: true,
        comment: { select: { id: true } },
      },
    });

    return listPostSchema.parse(posts);
  }
}

export { FindPostsByTagService };
