import 'dotenv/config';
import { randomInt } from 'crypto';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { MEMBERS } from '../src/lib/members';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Excludes visually-ambiguous characters (0/O, 1/I/L) so codes are easy to read and
// retype off a printed card.
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 12;

function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[randomInt(CODE_CHARS.length)];
  }
  return code;
}

// Per-member upload codes, in the same order as the public Team roster. These are the
// codes each team member types into the Gallery's "팀원 업로드" login to identify their
// own uploads. This is a full reset: every member gets a freshly generated 12-character
// code each time this script runs, so only run it when you actually want to (re)issue codes.
async function main() {
  await prisma.teamMember.deleteMany({});

  const results: { name: string; code: string }[] = [];

  for (let i = 0; i < MEMBERS.length; i++) {
    const member = MEMBERS[i];
    const code = generateCode();
    const codeHash = await bcrypt.hash(code, 10);

    await prisma.teamMember.create({
      data: { order: i, name: member.name, codeHash },
    });
    results.push({ name: member.name, code });
  }

  console.log('\n갤러리 업로드 코드 (팀원에게 개별로 전달하세요 — 다시 볼 수 없으니 꼭 저장해두세요):');
  console.table(results);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
