import prismaClient from '../../prisma';
//import { CreateTagData, ReturnTagData } from "../../interfaces/post/tagType";  <--- Coisar depois

class TagCreateService {

     /**
 * Creates a new tag in the database.
 *
 * @param {CreateTagData} data - The data for the tag being created.
 * @param {string} tagId - The Id for the tag being created.
 * @returns {Promise<ReturnTagData>} - A promise that resolves to the created post data, including tags
 * 
 * @throws {Error} - Throws an error if the post creation fails.
 */
/*    async create(data: CreateTagData, userId: string): Promise<ReturnPostData> {
        const tag = await prismaClient.post.create({
            data: {
                tag_name: data.tag_name
                tag_id: tagId
            }
        })
    }
*/
}

export { TagCreateService };