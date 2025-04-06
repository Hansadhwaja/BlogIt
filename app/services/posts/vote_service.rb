# frozen_string_literal: true

module Posts
  class VoteService
    attr_reader :user, :post, :vote_type

    def initialize(user:, post:, vote_type:)
      @user = user
      @post = post
      @vote_type = vote_type
    end

    def process
      vote = Vote.for_user_and_post(user, post).first

      if vote
        if vote.vote_type != @vote_type
          adjust_counters(old_type: vote.vote_type, new_type: @vote_type)
          vote.update!(vote_type: @vote_type)
        end
      else
        Vote.create!(user: user, post: post, vote_type: @vote_type)
        increment_counter(@vote_type)
      end

      update_bloggable_status
    end

    private

      def increment_counter(type)
        post.increment!(type.to_sym)
      end

      def decrement_counter(type)
        post.decrement!(type.to_sym)
      end

      def adjust_counters(old_type:, new_type:)
        decrement_counter(old_type)
        increment_counter(new_type)
      end

      def update_bloggable_status
        net_votes = post.upvote - post.downvote
        post.update!(is_bloggable: net_votes > BLOGGABLE_THRESHOLD)
      end
  end
end
