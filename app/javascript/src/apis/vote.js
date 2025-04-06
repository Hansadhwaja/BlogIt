import axios from "axios";

const create = (slug, type) => axios.post(`/posts/${slug}/votes`, { type });

export const votesApi = { create };
