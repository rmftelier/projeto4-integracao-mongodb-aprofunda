import { Book } from "../../core/entities/Book";
import { DeleteBook } from "../../core/usecases/DeleteBook";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('DeleteBook (UseCase)', () => {
  beforeEach(() => {
    bookRepository.books = [];
  });

  it('deve excluir um livro existente com sucesso', async () => {
    const book = new Book(
      '1',
      'Jurassic Park',
      'Michael Crichton',
      '2015-06-12',
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      new Date().toLocaleDateString('pt-br')
    );

    await bookRepository.save(book);

    const deleteBook = new DeleteBook(bookRepository);
    await deleteBook.execute(book.id);

    const deletedBook = await bookRepository.findById(book.id);
    expect(deletedBook).toBeNull();
  });
});