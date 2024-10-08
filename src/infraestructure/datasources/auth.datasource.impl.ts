import { BcryptAdapter } from "./../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { Hash } from "crypto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

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
        password: this.hashPassword(password),
      });

      await user.save();

      // 3. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;
    try {
      // 1. verificar si el correo existe
      const exists = await UserModel.findOne({ email });

      if (!exists?.email) throw CustomError.badRequest("Invalid email");

      // 2. verifico que la contrase;a es la misma
      const isPasswordValid = this.comparePassword(password, exists?.password!);

      if (!isPasswordValid) throw CustomError.badRequest("invalid Password ");

      return UserMapper.userEntityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
