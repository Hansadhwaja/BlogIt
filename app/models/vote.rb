# frozen_string_literal: true

class Vote < ApplicationRecord
  scope :for_user_and_post, ->(user, post) { where(user: user, post: post) }

  belongs_to :user
  belongs_to :post
end
