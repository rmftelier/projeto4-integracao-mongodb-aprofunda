import { Book } from "../../core/entities/Book";
import { UpdateBook } from "../../core/usecases/UpdateBook";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('UpdateBook (UseCase)', () => {
  let book: Book
  let bookId: string;

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
    );
    bookRepository.books.push(book);
    bookId = book.id;
  });

  it('deve atualizar um livro existente com sucesso', async () => {
    const updateBook = new UpdateBook(bookRepository);

    const update = await updateBook.execute(bookId, { genres: ['Ficção Científica'], publishedAt: '2025-07-12' });

    expect(update.title).toBe('Jurassic Park');
    expect(update.author).toEqual('Michael Crichton');
    expect(update.publishedAt).toEqual('12/07/2025');
    expect(update.format).toEqual('Físico');
    expect(update.pages).toEqual(528);
    expect(update.genres).toEqual(['Ficção Científica']);
    expect(update.language).toEqual('Português');
  });

  it('deve manter os campos anteriores se o data estiver vazio.', async () => {
    const updateBook = new UpdateBook(bookRepository);

    const update = await updateBook.execute(book.id, {});

    expect(update).toEqual(book);
  });

  it('deve atualizar os campos: title, author, format, pages e language com sucesso',
    async () => {
      const updateBook = new UpdateBook(bookRepository);

      const update = await updateBook.execute(book.id, {
        title: 'Em um porão escuro',
        author: 'Cara Hunter',
        format: 'Ebook',
        pages: 376,
        language: 'Português de Portugal'

      });

      expect(update.title).toEqual('Em um porão escuro');
      expect(update.format).toEqual('Ebook');
      expect(update.pages).toEqual(376);
      expect(update.language).toEqual('Português de Portugal');
    });

  it('não deve alterar nada se o livro não existir no repositório', async () => {

    const updateBook = new UpdateBook(bookRepository);

    await expect(
      updateBook.execute('99', { title: 'Novo Título' })
    ).rejects.toThrow('Livro não encontrado');

  });

});