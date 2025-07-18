import { Book } from "../../core/entities/Book";
import { GetAllBooks } from "../../core/usecases/GetAllBooks";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('GetAllBooks (UseCase)', () => {
  let book: Book;
  beforeEach(() => {
    bookRepository.books = [];
    book = new Book(
      '1',
      'Jurassic Park',
      'Michael Crichton',
      '2015-06-12',
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      new Date().toLocaleDateString('pt-br')
    )
    bookRepository.books.push(book);
  });

  it('deve retornar todos os livros criados', async () => {

    const getAllBooks = new GetAllBooks(bookRepository);

    const books = await getAllBooks.execute();

    expect(books).toHaveLength(1);
    expect(books[0].title).toBe('Jurassic Park');
  });
});