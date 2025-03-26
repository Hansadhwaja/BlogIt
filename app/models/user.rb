# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization
  has_many :posts

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
