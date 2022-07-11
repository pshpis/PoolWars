// pages/api/publish/[id].ts

import prisma from "../../../backend/prisma";

// PUT /api/check/:id
export default async function handle(req, res) {
  const codeId = req.query.id;
  let check = false;
  const code = await prisma.users.findMany({
    where: { nft_card_code: codeId, received_nft: false },
  });
  console.log(code);

  if (code.length > 0) {
    check = true;
  }
  console.log({ value: check });

  res.json({ value: check });
}