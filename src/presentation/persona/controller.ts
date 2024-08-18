import { CustomError, PersonaGetDto } from "../../domain";
import { Request, Response } from "express";

export class PersonaController {
  constructor() {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  getPersonas = (req: Request, res: Response) => {
    const [error, personaGetDto] = PersonaGetDto.create(req.body);
    if (error) return res.status(400).json({ error });
    return res.json(req.body);
  };
}
