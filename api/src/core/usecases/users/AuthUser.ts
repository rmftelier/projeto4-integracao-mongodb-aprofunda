import { UserRepository } from "@core/repositories/UserRepository";
import { generateToken } from "@shared/helpers/jwt";
import bcrypt from "bcrypt";

interface IAuthInput {
  login: string,
  password: string
}

export class AuthUser {
  constructor(private userRepository: UserRepository) { }
  async execute({ login, password }: IAuthInput): Promise<String> {

    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      throw new Error("Senha inválida");
    }

    const token = generateToken({ userId: user.id, login: user.login, role: user.role });

    return token;
  }
}