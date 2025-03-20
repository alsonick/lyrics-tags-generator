import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../components/Button";
import { Response } from "@/types/response";
import { Input } from "@/components/Input";
import { FaGithub } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { Step } from "../components/Step";
import { FiCopy } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import copy from "copy-to-clipboard";
import { useState } from "react";

// Next.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [bassBoosted, setBassBoosted] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState("");
  const [data, setData] = useState<Response>();
  const [artist, setArtist] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [title, setTitle] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there are any commas in the title or artist
    if (/,/.test(title) || /,/.test(artist)) {
      toast.error("Please remove any commas , from the title or artist.");
      return;
    }

    // Starts the loading
    setLoading(true);

    // Fetch the tags from the API
    const response = await fetch(
      `
      /api/gen?title=${title}&artist=${artist}${
        features ? `&features=${features}` : ""
      }&tiktok=${tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"}
    `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data: Response = await response.json();

      // Check if the response isn't successful
      if (!data.success) {
        toast.error(data.error);
        setLoading(false);
        alert(data.error);
        return;
      }

      // Split the tags by commas and trim them
      const separated = data.tags.split(",").map((tag) => tag.trim());

      // Success
      toast.success("Tags generated successfully.");
      setData(data);
      setTags(separated);
      setLoading(false);

      setTitle("");
      setArtist("");
      setFeatures("");
      setTiktok("");
    }

    // Checks if the response is not "ok"
    if (!response.ok) {
      console.log(response);
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const seoTitle = "Lyrics Tags Generator";
  const seoDescription = "Generate YouTube tags for your lyric videos.";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>{seoTitle} | YouTube</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={`${seoTitle} | YouTube`} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="twitter:title" content={`${seoTitle} | YouTube`} />
        <meta name="twitter:description" content={seoDescription} />
        <meta property="og:image" content="/tags.png" />
        <meta name="twitter:image" content="/tags.png" />
        <meta property="og:url" content="tags.notnick.io" />
        <meta property="og:type" content="website" />
        <meta name="twitter:image" content="/tags.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="flex lg:hidden">
        <p className="text-2xl text-center font-light">
          Whoop. This is awkward! This site only supports desktop size screens.
        </p>
      </div>
      <nav className="lg:flex items-center justify-between top-0 absolute h-20 w-full px-20 bg-white hidden">
        <Link
          href="https://github.com/alsonick/lyrics-tags-generator"
          target="_blank"
        >
          <FaGithub className="text-3xl" />
        </Link>
        <div className="flex">
          <Link
            className="font-semibold hover:underline mr-10"
            href="https://github.com/alsonick/lyrics-tags-generator/issues/new?template=Blank+issue"
            target="_blank"
          >
            Submit Suggestion
          </Link>
          <Link
            className="font-semibold hover:underline"
            href="https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot"
            target="_blank"
          >
            Invite Discord Bot
          </Link>
        </div>
      </nav>
      <main className="lg:flex flex-col py-32 h-full px-2 sm:w-[55rem] w-[95%] hidden">
        <header className="flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tighter">{seoTitle} ✍️</h1>
          <p className="text-gray-800 mt-4 text-xl font-medium">
            {seoDescription}
          </p>
        </header>
        <form onSubmit={submit} className="flex flex-col">
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={1} text="Artist" />
              <Input
                onChange={(e) => setArtist(e.target.value)}
                placeholder="The Chainsmokers"
                required={true}
                value={artist}
              />
              <p className="text-xs mt-1">
                Any special characters are allowed except commas ,.{" "}
                <span className="text-yellow-600 font-semibold">Required</span>
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={2} text="Title" />
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Don't Let Me Down"
                required={true}
                value={title}
              />
              <p className="text-xs mt-1">
                Please remove any commas , if there are any.{" "}
                <span className="text-yellow-600 font-semibold">Required</span>
              </p>
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={3} text="Features" />
              <Input
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Daya"
                value={features}
                required={false}
              />
              <p className="text-xs mt-1">
                Please use a comma , to separate feature artists.
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={4} text="TikTok" />
              <Input
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="false"
                required={false}
                value={tiktok}
              />
              <p className="text-xs mt-1">
                Is the song popular on TikTok? Type "true" if so.{" "}
              </p>
            </section>
          </div>
          <h3 className="mt-12">These options are not for lyric videos.</h3>
          <section className="flex flex-col w-full">
            <Step step={5} text="Bass Boosted" />
            <Input
              onChange={(e) => setBassBoosted(e.target.value)}
              placeholder="false"
              required={false}
              value={bassBoosted}
            />
            <p className="text-xs mt-1">Is this a bass boosted video? </p>
          </section>
          <div className="w-full justify-between items-center flex mt-2 border-b pb-4">
            <div className="ml-auto flex">
              <Button title="Generate tags">
                Generate <FiLoader className="ml-2" />
              </Button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="mt-28 flex justify-center items-center">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="border p-4 mt-4 rounded-xl">
              {tags.length > 0 && (
                <h2 className="text-2xl text-center font-light">
                  Tags generated for <i>{data?.title}</i> by{" "}
                  <b>{data?.artist}</b> 🤖
                </h2>
              )}
              <div className="flex flex-wrap gap-4 my-4 mt-6">
                {tags.length ? (
                  <>
                    {tags.map((tag) => (
                      <div
                        className="flex items-center border p-2 px-4 rounded-xl
                        hover:cursor-pointer w-fit duration-300 hover:shadow-lg"
                        onClick={() => {
                          const filtered = tags.filter((t) => t !== tag);
                          setTags(filtered);
                        }}
                      >
                        <p className="font-semibold">{tag}</p>
                        <FiX className="text-lg ml-1" />
                      </div>
                    ))}
                  </>
                ) : (
                  <h3 className="text-2xl font-light">
                    Click the "Generate" button to generate your tags. 🤖
                  </h3>
                )}
              </div>
            </div>
            {tags.length > 0 && (
              <Link
                title="Click to view json representation data."
                className="text-sm text-center mt-5 underline"
                target="_blank"
                href={data?.url ?? ""}
              >
                Click to view json representation data.
              </Link>
            )}
            <div className="flex w-full mt-4 items-center">
              <p
                className="text-sm"
                style={{
                  color: tags.join(",  ").length > 500 ? "red" : "black",
                  fontWeight: tags.join(",  ").length > 500 ? "500" : "normal",
                }}
              >
                {tags.join(",  ").length}/500
              </p>

              <Button
                title="Copy generated tags"
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  if (!tags.length) {
                    toast.error(
                      "Please generate the tags before you copy to clipboard."
                    );
                    return;
                  }
                  copy(tags.join(", "));
                  toast.success("Tags copied to the clipboard.");
                }}
              >
                Copy generated tags <FiCopy className="ml-2" />
              </Button>
            </div>
            {tags.join(",  ").length > 500 && (
              <p className="mt-4 text-sm text-red-500">
                Please delete the least suitable tags for your case.
              </p>
            )}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-bold">Hashtags:</h3>
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    <p className="text-xl mr-4">
                      #{data?.artist.replace(" ", "")}
                    </p>
                    <p className="text-xl mr-4">
                      #{data?.title.replace("'", "").replaceAll(" ", "")}
                    </p>
                    <p className="text-xl">#Lyrics</p>
                  </div>
                  <Button
                    onClick={() => {
                      const textToCopy = `#${data?.artist.replace(
                        " ",
                        ""
                      )} #${data?.title
                        .replace("'", "")
                        .replaceAll(" ", "")} #Lyrics`;
                      copy(textToCopy);
                      toast.success("Hashtags copied to the clipboard.");
                    }}
                  >
                    Copy <FiCopy className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
            {/* {tags.length > 0 && (
              <div className="flex flex-col mt-8 border-t pt-4">
                <h3 className="text-2xl font-bold">Extras</h3>
              </div>
            )} */}
          </div>
        )}
        <footer className="bottom-0 left-0 right-0  mt-28 text-center text-sm pb-4">
          <p className="text-gray-600">
            Built with ❤️ by{" "}
            <Link
              href="https://github.com/alsonick"
              className="font-bold hover:underline"
              target="_blank"
            >
              Nicholas Njoki
            </Link>
            .
          </p>
          <p className="text-gray-600">
            © {new Date().getFullYear()} | All rights reserved.
          </p>
        </footer>
      </main>
      <ToastContainer />
    </div>
  );
}
