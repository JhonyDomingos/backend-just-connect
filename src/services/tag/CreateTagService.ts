import prismaClient from '../../prisma';
//import { CreateTagData, ReturnTagData } from "../../interfaces/tag/TagType";
import { ITag } from '../../interfaces/tag/ITag';

class TagCreateService {

     /**
 * Creates a new tag in the database.
 *
 * @param {CreateTagData} data - The data for the tag being created.
 * @returns {Promise<ITag>} - A promise that resolves to the created post data, including tags
 * 
 * @throws {Error} - Throws an error if the tag creation fails.
 */
    async create(data: ITag): Promise<ITag> {
        const tag = await prismaClient.tag.create({
            data: {
                tag: data.tag,
            }
        });
        return tag;
    }

}

export { ITag };