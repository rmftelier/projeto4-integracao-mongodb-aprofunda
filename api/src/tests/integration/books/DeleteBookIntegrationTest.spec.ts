import request from "supertest";
import app from "../../infra/server/server";

describe("DELETE /books/:id", () => {
  let bookId: string;

  beforeAll(async () => {
    const { body } = await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português"
    });
    bookId = body.id;
  });

  it("deve retornar 204 quando remover um livro com sucesso", async () => {
    const response = await request(app).delete(`/books/${bookId}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 quando tentar remover um livro inexistente", async () => {
    const response = await request(app).delete("/books/123456");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Livro não encontrado');
  });


});