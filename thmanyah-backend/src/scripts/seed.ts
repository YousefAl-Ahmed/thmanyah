import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.searchResult.create({
    data: { term: 'hello', result: { ok: true, sample: 1 } },
  });
  const count = await prisma.searchResult.count();
  console.log('Rows in SearchResult:', count);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
