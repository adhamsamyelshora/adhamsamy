import { NextResponse } from 'next/server';
import { AuthService } from '@/server/auth/service';
import { registerSchema } from '@/server/auth/validators';

const authService = new AuthService();

export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const user = await authService.register(parsed.data);
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch {
    return NextResponse.json({ error: 'Could not register user' }, { status: 400 });
  }
}
