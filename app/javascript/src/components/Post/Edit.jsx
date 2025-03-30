import React, { useEffect, useState } from "react";

import { Container, PageTitle } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";
import { formatPost } from "./utils";

import { categoriesApi } from "../../apis/categories";
import postsApi from "../../apis/posts";

const EditPost = ({ history }) => {
  const { slug } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const updatedPost = {
      title: post.title,
      description: post.description,
      user_id: post?.user?.id,
      organization_id: post?.organization?.id,
      category_ids: post.categories?.map(category => category.id),
    };
    try {
      await postsApi.update(formatPost(updatedPost), slug);
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const { data } = await postsApi.show(slug);
      setPost(data);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const fetchCategories = async () => {
    const {
      data: { categories },
    } = await categoriesApi.fetch();
    setCategories(categories);
  };

  useEffect(() => {
    fetchPostDetails();
    fetchCategories();
  }, []);

  return (
    <Container className="p-8 lg:px-16">
      <div className="flex h-full flex-col gap-y-8">
        <PageTitle title="Edit blog post" />
        <Form
          buttonText="Update"
          {...{ handleSubmit, loading, setPost, post, history, categories }}
        />
      </div>
    </Container>
  );
};

export default EditPost;
