import axios from "axios";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let res;

  try {
    res = await axios.post(`/api/${slug}`, {
      shortUrl: slug,
    });
  } catch (error: unknown) {
    return (
      <div className="flex justify-center text-sm font-mono items-center h-screen">
        {"Something went wrong: "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (res.data.error) {
    return (
      <div className="flex justify-center text-sm font-mono items-center h-screen">
        {res.data.error}
      </div>
    );
  }

  redirect(res.data.longUrl);

  return <></>;
}
