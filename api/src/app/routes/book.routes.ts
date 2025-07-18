import { Router } from 'express';
import { GetAllBooksController } from '../controllers/books/GetAllBooksController';
import { GetBookByIdController } from "../controllers/books/GetBookByIdController";
import { CreateBookController } from "../controllers/books/CreateBookController";
import { UpdateBookByIdController } from "../controllers/books/UpdateBookByIdController";
import { DeleteBookByIdController } from "../controllers/books/DeleteBookByIdController";

const router = Router();

const getAllBooksController = new GetAllBooksController();
const getBookByIdController = new GetBookByIdController();
const createBookController = new CreateBookController();
const updateBookByIdController = new UpdateBookByIdController();
const deleteBookByIdController = new DeleteBookByIdController();

router.get("/books", async (req, res) => {
  await getAllBooksController.handle(req, res);
});

router.get("/books/:id", async (req, res) => {
  await getBookByIdController.handle(req, res);
});

router.post("/books", async (req, res) => {
  await createBookController.handle(req, res);
});

router.patch("/books/:id", async (req, res) => {
  await updateBookByIdController.handle(req, res);
});

router.delete("/books/:id", async (req, res) => {
  await deleteBookByIdController.handle(req, res);
})

export { router as bookRoutes };



