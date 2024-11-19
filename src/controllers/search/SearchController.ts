import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../../services/search/SearchService';

class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { query, type } = req.query;

    if (!query || !type) {
      return res.status(400).json({ error: 'Query and type are required' });
    }

    const types = Array.isArray(type) ? type as string[] : [type as string];
    const validTypes = ['users', 'posts', 'comments', 'tags'];
    const invalidTypes = types.filter(t => !validTypes.includes(t));

    if (invalidTypes.length > 0) {
      return res.status(400).json({ error: `Invalid search types: ${invalidTypes.join(', ')}` });
    }

    try {
      const results = await Promise.all(types.map(async (t) => {
        switch (t) {
          case 'users':
            return this.searchService.searchUsers(query as string);
          case 'posts':
            return this.searchService.searchPosts(query as string);
          case 'comments':
            return this.searchService.searchComments(query as string);
          case 'tags':
            return this.searchService.searchTags(query as string);
        }
      }));

      return res.status(200).json(results.flat());
    } catch (error) {
      next(error);
    }
  }
}

export { SearchController };
