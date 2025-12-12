import { prismaClient } from "../../prisma";
import { ReturnPostData, UpdatePostData } from "../../interfaces/post/PostType";
import { TagCreateService } from "../tag/CreateTagService";
import { returnPostSchema } from "../../schemas/postSchemas";

class UpdatePostService {
  /**
   * Updates an existing post.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostData} data - The data to update the post with.
   * @param {string} userId - The ID of the user updating the post.
   * @returns {Promise<ReturnPostData>} - The updated post.
   * @throws {AppError} - If the post is not found or the user lacks permission.
   */
  async update(id: string, data: UpdatePostData): Promise<ReturnPostData> {
    const post = await prismaClient.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    const tagService = new TagCreateService();

    const currentTags = post.tags.map((tag) => tag.id);

    const tags = await Promise.all(
      data.tags.map(async (tagName) => {
        return tagService.findOrCreate({ tag: tagName });
      })
    );

    const updatedPost = await prismaClient.post.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        tags: {
          disconnect: currentTags.map((id) => ({ id })),
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
      },
    });

    return returnPostSchema.parse(updatedPost);
  }
}

export { UpdatePostService };
