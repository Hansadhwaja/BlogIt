# frozen_string_literal: true

class CategoryPost < ApplicationRecord
  belongs_to :category
  belongs_to :post
end
