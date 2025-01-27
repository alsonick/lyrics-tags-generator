import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const features: string = req.query.features as string;
  const tiktok: string = req.query.tiktok as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  if (!artist || !title || !tiktok) {
    res.status(400).json({
      success: false,
      error: "Please provide artist, title and tiktok params.",
    });
    return;
  }

  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,${artist} ${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}`;

  if (tiktok === "true") {
    tags += `${artist} ${title},${title} tiktok,${artist} tiktok,tiktok`;
  }

  if (features) {
    let feats = features.split(",");

    const firstFeat = feats[0];

    tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${artist} ${firstFeat} ${title} lyrics,${firstFeat} lyrics,lyrics ${firstFeat}`;

    if (feats.length >= 2) {
      const secondFeat = feats[1];

      tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics, lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
    }

    tags += `,${[...feats]}`;
  }

  tags += ",lyrics";

  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
  });
}
