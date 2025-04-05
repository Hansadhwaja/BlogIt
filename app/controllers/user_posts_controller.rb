# frozen_string_literal: true

class UserPostsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    scope = Post.where(user_id: current_user.id).order(created_at: :desc)
    @posts = ::Posts::FilterService.new(scope, filter_params).process
  end

  private

    def filter_params
      params.permit(:title, :status, category_ids: [])
    end
end
