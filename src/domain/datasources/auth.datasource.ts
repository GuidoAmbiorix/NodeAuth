import { RegisterUserDto } from "./../dtos/auth/register-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
