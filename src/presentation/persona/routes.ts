import { Router } from "express";
import { PersonaController } from "./controller";

export class PersonaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PersonaController();

    router.get("/", controller.getPersonas);
    return router;
  }
}
