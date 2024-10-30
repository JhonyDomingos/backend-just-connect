import prismaClient from '../../prisma';
import { CreatePostData, ReturnPostData } from "../../interfaces/post/PostType";

class PostCreateService {

  /**
 * Creates a new post in the database.
 *
 * @param {CreatePostData} data - The data for the post being created.
 * @param {string} userId - The ID of the user creating the post.
 * @returns {Promise<ReturnPostData>} - A promise that resolves to the created post data, including tags.
 *
 * @throws {Error} - Throws an error if the post creation fails.
 */
  async create(data: CreatePostData, userId: string): Promise<ReturnPostData> {
    const post = await prismaClient.post.create({
      data: {
        title: data.title,
        description: data.description,
        user_id: userId
      }
    });
    return post;
  }
}

export { PostCreateService };