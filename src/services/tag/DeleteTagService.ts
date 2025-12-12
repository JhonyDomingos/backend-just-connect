import {prismaClient} from '../../prisma';
import { ReturnTagData } from "../../interfaces/tag/TagTypes"

class DeleteTagService {
    /**
     * Deletes a tag from the database.
     * 
     * @param {string} id - The tag to be deleted.
     * @returns {Promise<ReturnTagData>} - A promise that resolves to the deleted tag data.
     * 
     * @throws {Error} - Throws an error if the tag deletion fails
     */
    async delete(id: string): Promise<ReturnTagData> {
        // Optionally, you might want to check if the tag exists nd if the user has permission to delete it

        const deletedTag = await prismaClient.tag.delete({
            where: {
                id
            },
        });

        return deletedTag;
    }
}

export { DeleteTagService };