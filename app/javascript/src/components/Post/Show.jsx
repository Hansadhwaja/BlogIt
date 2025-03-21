import React, { useEffect, useState } from "react";

import { Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

import postsApi from "../../apis/posts";
import PageTitle from "../commons/PageTitle";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="p-16">
      <PageTitle title={post?.title} />
      <p className="mt-8">{post.description}</p>
    </Container>
  );
};

export default Show;
