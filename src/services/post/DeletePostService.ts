import prismaClient from "../../prisma";

class DeletePostService {
  /**
   * Deletes a post by its ID.
   *
   * @param {string} id - The ID of the post to delete.
   * @param {string} userId - The ID of the user requesting the deletion.
   * @returns {Promise<void>}
   * @throws {AppError} - If the post is not found or the user lacks permission.
   */
  async delete(id: string): Promise<void> {
    await prismaClient.post.delete({
      where: { id },
    });
  }
}

export { DeletePostService };
