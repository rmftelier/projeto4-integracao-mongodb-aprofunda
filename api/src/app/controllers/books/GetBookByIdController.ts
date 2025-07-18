import { Request, Response } from 'express';
import { GetBookById } from '../../../core/usecases/books/GetBookById';
import { bookRepository } from '../../../infra/database/repositoryInstance';

export class GetBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const getBookById = new GetBookById(bookRepository);
      const book = await getBookById.execute(id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      return res.status(200).json(book);

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

