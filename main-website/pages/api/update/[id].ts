// pages/api/publish/[id].ts

import prisma from "../../../backend/prisma";

// PUT /api/update/:id
export default async function handle(req, res) {
  const codeId = req.query.id;
  const code = await prisma.users.update({
    where: { nft_card_code: codeId },
    data: { received_nft: true },
  });
  res.json(code);
}
