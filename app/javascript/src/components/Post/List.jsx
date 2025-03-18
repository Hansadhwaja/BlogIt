import React, { useEffect, useState } from "react";

import Logger from "js-logger";

import Card from "./Card";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";
import PageTitle from "../commons/PageTitle";

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
    <div className="w-full">
      <PageTitle title="Blog posts" />
      <div className="mt-4">
        {posts.map(post => (
          <Card key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default List;
