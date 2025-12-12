import { CreateTagData, ReturnTagData } from "../../interfaces/tag/TagTypes";
import { prismaClient } from "../../prisma";

class TagCreateService {
  async findOrCreate(data: CreateTagData): Promise<ReturnTagData> {
    const tag = await prismaClient.tag.findUnique({ where: { tag: data.tag } });

    if (!tag) {
      const newTag = await prismaClient.tag.create({
        data: {
          tag: data.tag,
        },
      });
      return newTag;
    }

    return tag;
  }
}

export { TagCreateService };
