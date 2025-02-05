import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const features: string = req.query.features as string;
  const tiktok: string = req.query.tiktok as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  // Check if all the required fields are provided
  if (!artist || !title || !tiktok) {
    return res.status(400).json({
      success: false,
      error: "Please provide all the required fields.",
    });
  }

  // Check if there are any commas in the title or artist
  if (/,/.test(title) || /,/.test(artist)) {
    return res.status(400).send({
      success: false,
      error: "Please remove any commas , from the title or artist.",
    });
  }

  // Typical tags format you'd use for lyric videos
  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist}`;

  // Part to generate tags for tiktok option
  if (tiktok === "true") {
    tags += `,${title} tiktok,${artist} tiktok`;
  }

  // Probably shouldn't generate tags for features if tiktok is true because there would be too many tags
  // Part to generate tags for features
  if (features && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    let feats = features.split(",").map((feat) => feat.trim());

    const firstFeat = feats[0];

    tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics`;

    if (feats.length >= 2) {
      // So if there's more than two features, only generate tags for the first two features because there would be too many tags otherwise
      const secondFeat = feats[1];

      tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
    }
  }

  tags += ",lyrics";

  // Send the response
  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
    url: `/api/gen?title=${encodeURIComponent(
      title
    )}&artist=${encodeURIComponent(artist)}&features=${encodeURIComponent(
      features
    )}&tiktok=${
      tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
    }`,
    length: tags
      .split(",")
      .map((tag) => tag.trim())
      .join(",  ").length,
  });
}
