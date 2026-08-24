import 'dotenv/config';
import { randomInt } from 'crypto';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Same charset/length as prisma/seed.ts — excludes visually-ambiguous characters.
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 12;

function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[randomInt(CODE_CHARS.length)];
  }
  return code;
}

// Adds one or more gallery-upload codes without touching any existing
// TeamMember records (unlike seed.ts, which wipes and reissues everyone).
// Usage: npx tsx prisma/add-uploader.ts "이름1" "이름2" ...
async function main() {
  const names = process.argv.slice(2);
  if (names.length === 0) {
    console.error('Usage: npx tsx prisma/add-uploader.ts "이름1" "이름2" ...');
    process.exit(1);
  }

  const maxOrder = await prisma.teamMember.aggregate({ _max: { order: true } });
  let nextOrder = (maxOrder._max.order ?? -1) + 1;

  const results: { name: string; code: string }[] = [];
  for (const name of names) {
    const code = generateCode();
    const codeHash = await bcrypt.hash(code, 10);
    await prisma.teamMember.create({ data: { order: nextOrder++, name, codeHash } });
    results.push({ name, code });
  }

  console.log('\n새로 발급된 갤러리 업로드 코드 (다시 볼 수 없으니 꼭 전달/저장해두세요):');
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
