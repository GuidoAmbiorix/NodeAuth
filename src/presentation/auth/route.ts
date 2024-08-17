import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    // Definir todas mis rutas principales
    router.use("/login", controller.loginUser);
    router.use("/register", controller.registerUser);

    return router;
  }
}
