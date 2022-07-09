import { NextFunction, Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { Todo } from "../entities/Todo";
import dataSource from "../data-source";

export default class TodoRoute {
  public readonly router: Router;
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.router = Router();
    this.todoRepository = dataSource.getRepository(Todo);

    this.router.get("/", this.findAll);
    this.router.get("/:id", this.findOne);
    this.router.post("/", this.middleware, this.create);
    this.router.delete("/:id", this.delete);
  }

  private middleware = (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;

    if (typeof content !== "string" || content.trim().length < 2)
      return res.status(400).json({
        success: false,
        message: "Invalid content",
      });

    next();
  };

  private findAll = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.find();
    return res.status(200).json({
      success: true,
      data: { todos },
    });
  };

  private findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = await this.todoRepository.findOneBy({ id: parseInt(id, 10) });
    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { todo },
    });
  };

  private create = async (req: Request, res: Response) => {
    const { content } = req.body;
    const newTodo = this.todoRepository.create({ content });
    await this.todoRepository.save(newTodo);

    return res.status(201).json({
      success: true,
    });
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.todoRepository.delete(id);
    res.status(204).json({
      success: true,
    });
  };
}
