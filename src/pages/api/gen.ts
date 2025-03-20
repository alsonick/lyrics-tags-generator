import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const bassboosted: string = req.query.bassboosted as string;
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

  if (bassboosted === "true") {
    tags = `${artist} ${title} bass boosted,${title} ${artist} bass boosted,${title} bass boosted,${title} bass,${artist} ${title} bass boost,${title} ${artist} bass boost,bass boosted,bass boost,${artist} ${title},${title} ${artist},${title},${artist}`;
  }

  // Part to generate tags for tiktok option
  if (tiktok === "true") {
    tags += `,${title} tiktok,${artist} tiktok`;
  }

  // Probably shouldn't generate tags for features if tiktok is true because there would be too many tags
  // Part to generate tags for features
  if (
    features !== undefined &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    let feats = features.split(",").map((feat) => feat.trim());

    // Only generate tags for the first feature
    if (bassboosted === "true") {
      // Only generate a few tags for bass boosted features
      tags += `${feats[0]} ${title} bass boosted,${title} ${feats[0]} bass boosted, ${feats[0]} ${title} bass,${title} ${feats[0]} bass, ${feats[0]} bass`;
      return;
    }

    const firstFeat = feats[0];

    tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics`;

    if (feats.length >= 2) {
      // So if there's more than two features, only generate tags for the first two features because there would be too many tags otherwise
      const secondFeat = feats[1];

      tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
    }
  }

  tags += ",lyrics";

  // Extras - Generate different title formats
  let artistArray = artist.split(" ");
  let titleArray = title.split(" ");
  let computedArtist = "";
  let computedTitle = "";

  const trim = (str: string) => str.trim();

  // Formats the title to have the first letter of each word capitalized
  for (let i = 0; i < titleArray.length; i++) {
    computedTitle += `${titleArray[i][0].toUpperCase()}${titleArray[
      i
    ].substring(1)} `;
  }

  // Formats the artist to have the first letter of each word capitalized
  for (let i = 0; i < artistArray.length; i++) {
    computedArtist += `${artistArray[i][0].toUpperCase()}${artistArray[
      i
    ].substring(1)} `;
  }

  let format: string = "";

  // Check if there are any features
  if (features !== undefined) {
    const feats: string[] = features
      .split(",")
      .map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`);

    format += `${trim(computedArtist)} - ${trim(computedTitle)} ft. ${
      feats[0]
    } (Lyrics),${trim(computedArtist)} & ${feats[0]} - ${trim(
      computedTitle
    )} (Lyrics),${trim(computedArtist)}, ${feats[0]} - ${trim(
      computedTitle
    )} (Lyrics)`;

    // If there are two features
    if (feats.length === 2) {
      format += `${trim(computedArtist)} - ${trim(
        computedTitle
      )} (Lyrics) ft. ${feats[0]}, ${feats[1]}`;
    }

    // If there are three features
    if (feats.length === 3) {
      format += `${trim(computedArtist)} - ${trim(
        computedTitle
      )} (Lyrics) ft. ${feats[0]}, ${feats[1]}, ${feats[2]}`;
    }
  } else {
    format += `${trim(computedArtist)} - ${trim(computedTitle)} (Lyrics)`;
  }

  // Send the response
  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
    title: trim(computedTitle),
    artist: trim(computedArtist),
    t: `${trim(computedArtist)} - ${trim(computedTitle)}`,
    features:
      features !== undefined
        ? features
            .split(",")
            .map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`)
        : [],
    extras: {
      titles: format,
    },
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
