import request from "supertest";
import app from "../../infra/server/server";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('GET /books', () => {

  it('deve retornar todos os livros cadastrados com sucesso', async () => {

    await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português"
    });

    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe("Jurassic Park");
  });

  it('deve retornar o status 500 se ocorrer um erro inesperado', async () => {

    jest
      .spyOn(bookRepository, 'getAll')
      .mockRejectedValue(new Error('Falha inesperada'));

    const response = await request(app).get("/books");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Falha inesperada');

  });
});