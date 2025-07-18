import { Book } from "../../core/entities/Book";
import { GetBookById } from "../../core/usecases/GetBookById";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('GetBookById (UseCase)', () => {
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

  it('deve retornar o livro com o id correspondente corretamente', async () => {

    const getBookById = new GetBookById(bookRepository);

    const book = await getBookById.execute('1');

    expect(book?.id).toBe('1');
    expect(book?.title).toBe('Jurassic Park');
  });
});