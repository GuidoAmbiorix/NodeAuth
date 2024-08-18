import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { PersonaRoutes } from "./persona/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir todas mis rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/persona", PersonaRoutes.routes);

    return router;
  }
}
