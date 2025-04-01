# frozen_string_literal: true

class UserPostsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @posts = Post.where(user_id: current_user.id).order(created_at: :desc)
  end
end
