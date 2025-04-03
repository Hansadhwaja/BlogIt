# frozen_string_literal: true

class RemoveDraftedAtColumnFromPosts < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :drafted_at
  end
end
