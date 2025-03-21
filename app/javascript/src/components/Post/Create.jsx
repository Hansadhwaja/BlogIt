import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";

import Form from "./Form";
import { formatPost } from "./utils";

import postsApi from "../../apis/posts";

const Create = ({ history }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create(formatPost(post));
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container className="p-8 lg:px-16">
      <div className="flex h-full flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form {...{ handleSubmit, loading, setPost, post, history }} />
      </div>
    </Container>
  );
};

export default Create;
