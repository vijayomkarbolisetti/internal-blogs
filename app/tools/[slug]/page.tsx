"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/app/lib/sanity";

// ✅ Fetch Single Tool by Slug
async function getTool(slug: string) {
  return await client.fetch(
    `*[_type == "tool" && slug.current == $slug][0] {
      title,
      logo{
        asset->{url}
      },
      description,
      details,
      link
    }`,
    { slug }
  );
}

export default function ToolPage() {
  const { slug } = useParams();
  const [tool, setTool] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedTool = await getTool(slug as string);
      setTool(fetchedTool);
    }
    fetchData();
  }, [slug]);

  if (!tool) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="bg-white min-h-screen ">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">

          {tool.logo?.asset?.url && (
            <img
              src={urlFor(tool.logo)?.url()}
              alt={tool.title}
              className="w-16 h-16 mx-auto mb-4"
            />
          )}


          <h1 className="text-3xl font-bold text-center">{tool.title}</h1>


          <p className="text-gray-600 text-center mt-2">{tool.description}</p>

          <div className="mt-6 text-gray-700">
            <PortableText value={tool.details || []} />
          </div>

        
          {tool.link && (
            <div className="flex justify-center mt-6">
              <a
                href={tool.link}
                target="_blank"
                className="bg-black text-white px-6 py-2 rounded-lg"
              >
                Visit Tool
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
