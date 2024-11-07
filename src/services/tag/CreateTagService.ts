import prismaClient from '../../prisma';

import { ITag } from '../../interfaces/tag/ITag';

class TagCreateService {

     /**
 * Creates a new tag in the database.
 *
 * @param {ITag} data - The data for the tag being created.
 * @returns {Promise<ITag>} - A promise that resolves to the created post data, including tags
 * 
 * @throws {Error} - Throws an error if the tag creation fails.
 */
    async create(data: ITag): Promise<ITag> {
        const tag = await prismaClient.tag.findUnique({where:{tag:data.tag}})

        if (!tag) {
            const newTag = await prismaClient.tag.create({
                data: {
                    tag: data.tag,
                }
            });
            return newTag;
        }
        return tag;
    }

}

export { TagCreateService };