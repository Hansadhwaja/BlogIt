export const formatPost = post => {
  const { title, description } = post;

  const newTitle = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
  const newDescription = `${description
    .charAt(0)
    .toUpperCase()}${description.slice(1)}`;

  return { ...post, title: newTitle, description: newDescription };
};
