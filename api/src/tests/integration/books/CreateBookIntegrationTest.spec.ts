import request from "supertest";
import app from "../../infra/server/server";
import { bookRepository } from '../../infra/database/repositoryInstance';

describe("POST /books", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve criar um novo livro com sucesso", async () => {

    const response = await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português"
    });

    expect(response.status).toBe(201);
  });

  it('deve retornar o status 500 se ocorrer um erro inesperado', async () => {
    jest.spyOn(bookRepository, 'save').mockRejectedValue(new Error('Falha inesperada'));

    const response = await request(app)
      .post('/books')
      .send({
        title: "Teste",
        author: "Teste",
        publishedAt: "2025-01-01",
        format: "Digital",
        pages: 100,
        genres: ["Teste"],
        language: "Português"
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Falha inesperada');
  });

})