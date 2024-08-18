import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(registerUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Logear usuario
    const user = await this.authRepository.login(loginUserDto);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
