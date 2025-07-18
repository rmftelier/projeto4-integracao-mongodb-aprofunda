import { Book } from "../../entities/Book";
import { BookRepository } from "../../repositories/BookRepository";

export class GetAllBooks {
  constructor(private bookRepository: BookRepository) { }

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}