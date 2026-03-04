import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { RegisterInput } from './validators';

export class AuthService {
  async register(input: RegisterInput) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    return prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name
      }
    });
  }

  async validateCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;
    return user;
  }
}
