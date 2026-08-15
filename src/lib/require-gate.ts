import { cookies } from 'next/headers';
import { GATE_COOKIE_NAME, verifyGateToken } from '@/lib/gate-session';

export async function requireGate(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyGateToken(cookieStore.get(GATE_COOKIE_NAME)?.value);
}
