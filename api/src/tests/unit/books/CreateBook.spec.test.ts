import { Book } from "../../core/entities/Book";
import { CreateBook } from "../../core/usecases/CreateBook";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('CreateBook (UseCase)', () => {
  beforeEach(() => {
    bookRepository.books = [];
  });

  it('deve criar um novo livro e armazenar no repositório', async () => {
    const createBook = new CreateBook(bookRepository);

    const book = await createBook.execute({
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      publishedAt: '2015-06-12',
      format: 'Físico',
      pages: 528,
      genres: ['Ficção Científica', 'Ação', 'Aventura'],
      language: 'Português'
    });

    expect(book).toBeInstanceOf(Book);
    expect(book.title).toBe('Jurassic Park');
    expect(book.publishedAt).toBe('12/06/2015')
    expect(book.genres.every(item => typeof item === 'string')).toBe(true);
    expect(bookRepository.books).toHaveLength(1);
  })
})