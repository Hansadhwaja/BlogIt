# frozen_string_literal: true

json.array! @posts do |post|
  json.extract! post, :id, :title, :published_at, :status,:slug
  json.categories post.categories, :name
end
