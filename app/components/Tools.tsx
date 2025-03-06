"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client, urlFor } from "@/app/lib/sanity";


async function getTools() {
  return await client.fetch(
    `*[_type == "tool"] | order(title asc) {
      _id,
      title,
      slug,
      logo{
        asset->{url}
      },
      description
    }`
  );
}

export default function Tools() {
  const [tools, setTools] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedTools = await getTools();
      setTools(fetchedTools);
    }
    fetchData();
  }, []);

  const displayedTools = showAll ? tools : tools.slice(0, 6);

  return (
    <div className="bg-white min-h-screen ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-black mb-4">All Tools</h1>
        <p className="text-center text-gray-600 mb-6">
          Find or list tools that help designers build to last. Simplify design with our comprehensive and carefully vetted library.
        </p>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTools.map((tool) => {
            const toolLink = tool.slug?.current ? `/tools/${tool.slug.current}` : "#"; 

            return (
                <div key={tool._id} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
  

                {tool.logo?.asset?.url ? (
                  <img
                    src={urlFor(tool.logo)?.url()}
                    alt={tool.title}
                    className="w-12 h-12 object-contain mb-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                    ❌
                  </div>
                )}
              
            
                <h2 className="text-lg font-bold text-gray-900">{tool.title}</h2>
              

                <p className="text-gray-600 mt-2">{tool.description}</p>
              

                <div className="w-full flex justify-start mt-2">
                  <Link 
                    href={toolLink} 
                    className="text-purple-800 font-semibold rounded-md"
                  >
                    Learn More →
                  </Link>
                </div>
              
              </div>
              
            );
          })}
        </div>

        {tools.length > 6 && !showAll && (
          <div className="flex justify-center mt-8">
            <button onClick={() => setShowAll(true)} className="bg-black text-white px-6 py-2 rounded-lg">
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
    