# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  before_action :load_posts!, only: :index
  def index
    if params[:category_ids].present?
      category_ids = params[:category_ids].map(&:to_i)
      @posts = @posts.joins(:categories).where(categories: { id: category_ids }).distinct
    end
  end

  def create
    Post.create!(post_params)
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :status, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def load_posts!
      @posts = Post.includes(
        :categories, :user,
        :organization).where(organization_id: params[:organization_id].to_i).order(created_at: :desc)
    end
end
