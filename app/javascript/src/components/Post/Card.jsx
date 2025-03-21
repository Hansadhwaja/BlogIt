import React from "react";

import { Link } from "react-router-dom";

const Card = ({ title, description, created_at, slug }) => {
  const createdAt = new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-6">
      <Link
        className="text-lg font-semibold capitalize"
        to={`/posts/${slug}/show`}
      >
        {title}
      </Link>
      <p className="mt-2 text-sm">
        {description.length > 180
          ? `${description.slice(0, 180)}...`
          : description}
      </p>
      <p className="mt-2 text-[10px]">{createdAt}</p>
      <hr className="mt-2" />
    </div>
  );
};

export default Card;
