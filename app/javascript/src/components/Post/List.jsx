import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { Link } from "react-router-dom";

import Card from "./Card";

import postsApi from "../../apis/posts";
import { Button, PageLoader, PageTitle } from "../commons";

const List = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      Logger.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="my-4 h-screen w-full p-6 lg:p-12">
      <div className="mb-4 flex justify-between">
        <PageTitle title="Blog posts" />
        <Link className="my-auto mr-4" to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      <div className="h-[90%] overflow-y-scroll">
        {posts.map(post => (
          <Card key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default List;
