# frozen_string_literal: true

class FixForeignKeyNamesInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :users_id, :user_id
    rename_column :posts, :organizations_id, :organization_id
  end
end
