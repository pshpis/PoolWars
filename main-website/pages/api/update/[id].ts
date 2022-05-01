// pages/api/publish/[id].ts

import prisma from "../../../lib/prisma";

// PUT /api/update/:id
export default async function handle(req, res) {
  const codeId = req.query.id;
  const code = await prisma.code.update({
    where: { id: codeId },
    data: { used: true },
  });
  res.json(code);
}
