import prismaClient from "../../prisma";
import { ListPostData } from "../../interfaces/post/PostType";
import { listPostSchema } from "../../schemas/postSchemas";
import { ListUserData } from "../../interfaces/user/UserTypes";
import { ListUserSchema } from "../../schemas/userSchemas";
import { ListCommentData } from "../../interfaces/comments/CommentTypes";
import { ListCommentSchema } from "../../schemas/commentSchemas";
import { ListTagData } from "../../interfaces/tag/TagTypes";
import { ListTagSchema } from "../../schemas/tagSchemas";

class SearchService {
  async searchUsers(query: string): Promise<ListUserData> {
    const user = await prismaClient.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      } ,
      select: {
        username: true,
        name: true,
        email: true,
        bio_description: true,
        posts: {
          select: {
            id: true,
          },
        },
      }
    });

    const userWithPostCount = user.map((user) => ({
      ...user,
      postCount: user.posts.length,
    }));

    return ListUserSchema.parse(userWithPostCount);
  }

  async searchPosts(query: string): Promise<ListPostData> {
    const posts = await prismaClient.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        user: {
          select: { username: true },
        },
        description: true,
        score: true,
        status_open: true,
        created_at: true,
        updated_at: true,
        tags: true,
        comment: {
          select: { 
            id: true,
            comment: true,
           },
        },
      },
    })

    const postsWithCommentCount = posts.map((post) => ({
      ...post,
      username: post.user.username,
      commentCount: post.comment.length,
    }));

    return listPostSchema.parse(postsWithCommentCount);
  }

  async searchComments(query: string): Promise<ListCommentData> {
    const comment = await prismaClient.comment.findMany({
      where: {
        comment: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        comment: true,
      }
    })

    const commentWithScore = comment.map((comment) => ({
      ...comment,
      score: comment.comment.length,
    }));

    return ListCommentSchema.parse(commentWithScore);
  }

  async searchTags(query: string): Promise<ListTagData> {
    const tag = await prismaClient.tag.findMany({
      where: {
        tag: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        tag: true,
        posts: {
          select: {
            id: true,
          },
        },
      }
    });

    const tagWithPostCount = tag.map((tag) => ({
      ...tag,
      postCount: tag.posts.length,
    }));

    return ListTagSchema.parse(tagWithPostCount);
  }
}

export { SearchService };