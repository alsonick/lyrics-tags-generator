# Lyrics Tags Generator ([tags.notnick.io](https://tags.notnick.io/))

This is a small utility tool for personal use, but you can also use it if you have a music channel on [YouTube](https://www.youtube.com).

## What to provide

- `Artist` *(Required)*
- `Title` *(Required)*
- `Features` (Optional)
- `TikTok` (Optional)

## Format

### (excluding features and tiktok):

```
${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist}
```

### (including tiktok and excluding features):

```
${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist},${title} tiktok,${artist} tiktok
```

> If `TikTok` is provided then feature tags will not be generated.

### (including features and excluding tiktok):

```
${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist},${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics
```

### (including features `[>= 2 features]` and excluding tiktok):

```
${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist},${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}
```

> If there are more than 2 features, then it will only use the first two features.

If you think a different format works better, then please [submit an issue](https://github.com/alsonick/lyrics-tags-generator/issues/new?template=Blank+issue) or [email me](mailto:hi@notnick.io).

## Data

[Click here to open the json representation.](https://tags.notnick.io/api/gen?title=Don%27t%20Let%20Me%20Down&artist=The%20Chainsmokers&features=Daya&tiktok=false)

```json
{
    "success": true,
    "tags": "the chainsmokers don't let me down,the chainsmokers don't let me down lyrics,don't let me down lyrics,don't let me down the chainsmokers lyrics,lyrics don't let me down,lyrics the chainsmokers don't let me down,the chainsmokers lyrics don't let me down,don't let me down lyrics the chainsmokers,don't let me down lyric video,lyrics don't let me down the chainsmokers,the chainsmokers lyrics,lyrics the chainsmokers,don't let me down,the chainsmokers, don't let me down the chainsmokers,daya don't let me down lyrics,lyrics daya don't let me down,daya lyrics,lyrics",
    "title": "Don't Let Me Down",
    "artist": "The Chainsmokers",
    "t": "The Chainsmokers - Don't Let Me Down",
    "features": [
        "Daya"
    ],
    "extras": {
        "titles": "The Chainsmokers - Don't Let Me Down ft. Daya (Lyrics),The Chainsmokers & Daya - Don't Let Me Down (Lyrics),The Chainsmokers, Daya - Don't Let Me Down (Lyrics)"
    },
    "url": "/api/gen?title=Don't%20Let%20Me%20Down&artist=The%20Chainsmokers&features=Daya&tiktok=false",
    "length": 599
}
```

> Sometimes it will generate too many tags (500 is the limit), so you'll have to delete the tags you think are least effective.

## Discord Bot

Using the [Discord](https://discord.com/) bot version is probably faster. You also need to be familiar with [slash commands](https://support-apps.discord.com/hc/en-us/articles/26501837786775-Slash-Commands-FAQ).

<img width="485" alt="Screenshot 2025-02-26 at 22 27 41" src="https://github.com/user-attachments/assets/a3d1f54f-44ed-45a6-9478-c4c21eb13b42" />

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## License

MIT License

Copyright (c) 2025 Nicholas Njoki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
