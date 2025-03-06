"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/app/lib/sanity";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // ✅ Import Back Icon

// ✅ Fetch Post Data from Sanity
async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      body,
      publishedAt,
      mainImage{
        asset->{_id, url}
      },
      categories[]->{
        _id,
        title
      }
    }`,
    { slug }
  );
}

// ✅ Date Formatter Function
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsPage() {
  const { slug } = useParams();
  const router = useRouter(); // ✅ Back Button Navigation
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedPost = await getPost(slug as string);
      setPost(fetchedPost);
    }
    fetchData();
  }, [slug]);

  if (!post) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen text-black ">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 p-4 flex justify-center">
        <div className=" md:p-10 rounded-lg shadow-lg w-full max-w-3xl">

      
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>

          <h1 className="text-2xl font-bold">{post.title}</h1>

          <p className="text-gray-500 text-sm mt-2">
            Published on: <span className="font-medium">{formatDate(post.publishedAt)}</span>
          </p>


          {post.mainImage?.asset?.url && (
            <img
              src={urlFor(post.mainImage)?.url()}
              alt={post.title}
              className="w-full h-52 object-cover rounded-md shadow-lg mt-4"
            />
          )}

   
          {post.categories?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((category: { _id: string; title: string }) => (
                <span key={category._id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm">
                  {category.title}
                </span>
              ))}
            </div>
          )}

      
          <div className="mt-6 text-gray-700">
            <PortableText value={post.body || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
