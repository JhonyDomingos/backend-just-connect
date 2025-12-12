import {prismaClient} from "../../prisma";
import { ListPostData } from "../../interfaces/post/PostType";
import { listPostSchema } from "../../schemas/postSchemas";

class GetFollowedTagsPostsService {
  async getPosts(userId: string): Promise<ListPostData> {
    const userTags = await prismaClient.tagFollow.findMany({
        where: {
          user_id: userId,
        },
        select: {
          tag: {
            select: {
              tag: true,
            },
          },
        },
      });
  
      const tagNames = userTags.map(tagFollow => tagFollow.tag.tag);
  
      const findPosts = await prismaClient.post.findMany({
        where: {
          tags: {
            some: {
              tag: {
                in: tagNames,
              },
            },
          },
        },
        include: {
          user: { select: { id: true, username: true } },
          tags: true,
          comment: { select: { id: true } },
        },
      });
  
      const posts = findPosts.map((post) => ({
        ...post,
        user_id: post.user.id,
        username: post.user.username,
        commentCount: post.comment.length,
      }));
  
      return listPostSchema.parse(posts);
    }
}

export { GetFollowedTagsPostsService };
