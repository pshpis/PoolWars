// pages/api/publish/[id].ts

import prisma from "../../../lib/prisma";

// PUT /api/check/:id
export default async function handle(req, res) {
  const codeId = req.query.id;
  let check = false;
  const code = await prisma.code.findMany({
    where: { id: codeId, used: false },
  });
  console.log(code);

  if (code.length > 0) {
    check = true;
  }
  console.log({ value: check });

  res.json({ value: check });
}
