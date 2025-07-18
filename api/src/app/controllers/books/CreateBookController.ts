import { Request, Response } from 'express';
import { CreateBook } from '../../../core/usecases/books/CreateBook';
import { bookRepository } from '../../../infra/database/repositoryInstance';


export class CreateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      title,
      author,
      publishedAt,
      format,
      pages,
      genres,
      language } = req.body;

    try {
      const createBook = new CreateBook(bookRepository);

      const book = await createBook.execute({ title, author, publishedAt, format, pages, genres, language });

      return res.status(201).json(book);

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};