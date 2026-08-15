import { cookies } from 'next/headers';
import { GATE_COOKIE_NAME, verifyGateToken } from '@/lib/gate-session';
import AppShell from '@/components/AppShell';

export default async function Page() {
  const cookieStore = await cookies();
  const initiallyUnlocked = verifyGateToken(cookieStore.get(GATE_COOKIE_NAME)?.value);

  return <AppShell initiallyUnlocked={initiallyUnlocked} />;
}
