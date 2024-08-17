import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. verificar si el correo existe
      const exists = await UserModel.findOne({ email });

      if (exists) throw CustomError.badRequest("User already exists");

      // 3. Mapear la respuesta a nuestra entidad
      const user = await UserModel.create({
        name,
        email,
        password,
      });

      await user.save();

      return new UserEntity(user.id, name, email, password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
