import React, { useEffect, useState } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import { useHistory, useParams, Link } from "react-router-dom";

import Category from "./Category";
import { formatDate } from "./utils";

import postsApi from "../../apis/posts";
import { getFromLocalStorage } from "../../utils/storage";
import PageTitle from "../commons/PageTitle";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();
  const userId = getFromLocalStorage("authUserId");

  const fetchPostDetails = async () => {
    try {
      const { data } = await postsApi.show(slug);
      setPost(data);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };
  const isOwner = Number(userId) === post?.user?.id;

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="p-16">
      <Category categories={post.categories} />
      <div className="flex justify-between">
        <PageTitle title={post?.title} />
        {isOwner && (
          <Link className="my-auto" to={`/posts/${slug}/edit`}>
            <Button
              className="flex w-12 justify-center"
              icon={Edit}
              style="tertiary"
              tooltipProps={{ content: "Edit", position: "right" }}
            />
          </Link>
        )}
      </div>
      <p className="mt-2 text-xs font-bold">{post.user.name}</p>
      <p className=" text-[10px]">{formatDate(post.created_at)}</p>
      <p className="mt-8">{post.description}</p>
    </Container>
  );
};

export default ShowPost;
