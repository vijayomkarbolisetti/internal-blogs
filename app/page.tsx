"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "@/app/lib/sanity";
import Tools from "./components/Tools";

// ✅ Define TypeScript Interfaces
interface Category {
  _id: string;
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  categories?: Category[];
  body?: { children?: { text: string }[] }[];
  mainImage?: { asset?: { _id: string; url: string } };
}

// ✅ Fetch posts with correct types
async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      categories[]->{
        _id,
        title
      },
      body[] {
        children[] {
          text
        }
      },
      mainImage {
        asset->{_id, url}
      }
    }`
  );
}

// ✅ Fetch categories with correct types
async function getCategories(): Promise<Category[]> {
  return await client.fetch(`*[_type == "category"] | order(title asc) { _id, title }`);
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await getPosts();
      const fetchedCategories = await getCategories();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
      setCategories([{ _id: "all", title: "All" }, ...fetchedCategories]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== "All") {
      filtered = posts.filter((post) =>
        post.categories?.some((category) => category.title === selectedCategory)
      );
    }

    if (search) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, search, posts]);

  // ✅ Show either first 6 posts or all posts when "View More" is clicked
  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 5);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-left text-black mb-4">Latest Blog</h1>
        <p className="text-left text-xl text-gray-600 mb-6">
          Find tools that help designers build to last. Simplify design with our comprehensive and vetted library.
        </p>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search title..."
            className="border p-2 rounded w-2/3 md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ✅ Categories List */}
        <div className="flex overflow-x-auto justify-center items-center gap-4 px-4 pb-2">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.title)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap border ${
                selectedCategory === category.title
                  ? "bg-purple-700 text-white border-none"
                  : "border-gray-300 text-black"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* ✅ First Two Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPosts.slice(0, 2).map((post) => (
            <Link key={post._id} href={`/news/${post.slug.current}`} className="block bg-gray-100 p-4 rounded-lg shadow-lg">
              {post.mainImage?.asset?.url && (
                <img
                  src={urlFor(post.mainImage.asset)?.url() || ""}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
              <div className="mt-4">
                <div className="mt-3 flex items-center text-sm text-gray-500 justify-between">
                  {post.categories && post.categories.length > 0 && (
                    <ul className="flex space-x-2">
                      {post.categories.map((category, index) => (
                        <li key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs">
                          {category.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p>{new Date(post.publishedAt).toDateString()}</p>
                </div>
                <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
                {post.body?.[0]?.children?.[0]?.text && (
                  <p className="text-gray-500 mt-2">
                    {post.body[0].children[0].text.substring(0, 100)}...
                  </p>
                )}
                <p className="mt-2 text-purple-800 font-semibold">Learn More →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ Remaining Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {displayedPosts.slice(2).map((post) => (
            <Link key={post._id} href={`/news/${post.slug.current}`} className="block bg-gray-100 p-4 rounded-lg shadow-lg">
              {post.mainImage?.asset?.url && (
                <img
                  src={urlFor(post.mainImage.asset)?.url() || ""}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
                {post.body?.[0]?.children?.[0]?.text && (
                  <p className="text-gray-500 mt-2">
                    {post.body[0].children[0].text.substring(0, 100)}...
                  </p>
                )}
                <p className="mt-2 text-purple-800 font-semibold">Learn More →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ No Data Found Message */}
        {filteredPosts.length === 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-gray-500 text-lg">No data found</p>
          </div>
        )}

        {/* ✅ View More Button */}
        {filteredPosts.length > 5 && !showAll && (
          <div className="flex justify-center mt-8">
            <button onClick={() => setShowAll(true)} className="bg-black text-white px-6 py-2 rounded-lg">
              View More
            </button>
          </div>
        )}
      </div>

      <Tools />
    </div>
  );
}
