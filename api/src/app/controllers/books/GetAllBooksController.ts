import { Request, Response } from 'express';
import { GetAllBooks } from '../../../core/usecases/books/GetAllBooks';
import { bookRepository } from "../../../infra/database/repositoryInstance";

export class GetAllBooksController {

  async handle(req: Request, res: Response): Promise<Response> {

    try {
      const allBooks = new GetAllBooks(bookRepository);

      const books = await allBooks.execute();

      return res.status(200).json(books);

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}