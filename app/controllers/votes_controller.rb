# frozen_string_literal: true

class VotesController < ApplicationController
  def create
    post = Post.find_by!(slug: params[:post_slug])
    Posts::VoteService.new(user: current_user, post: post, vote_type: params[:type]).process
    @post = post.reload
  end
end
