import { Request, Response } from 'express';
import { DeleteBook } from '../../../core/usecases/books/DeleteBook';
import { bookRepository } from '../../../infra/database/repositoryInstance';

export class DeleteBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deleteBook = new DeleteBook(bookRepository);

      await deleteBook.execute(id);

      return res.status(204).send();

    } catch (error: any) {

      if (error.message === 'Livro não encontrado') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}