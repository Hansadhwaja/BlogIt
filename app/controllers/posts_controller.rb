# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories, :user, :organization)

    if params[:category_ids].present?
      category_ids = params[:category_ids].map(&:to_i)
      posts = posts.joins(:categories).where(categories: { id: category_ids }).distinct
    end

    render status: :ok, json: posts.as_json(include: [:categories, :user, :organization])
  end

  def create
    post = Post.new(post_params)
    post.categories = Category.where(id: params[:post][:category_ids]) if params[:post][:category_ids].present?
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    post = Post.includes(:categories, :user, :organization).find_by!(slug: params[:slug])
    render status: :ok, json: post.as_json(include: [:categories, :user, :organization])
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
