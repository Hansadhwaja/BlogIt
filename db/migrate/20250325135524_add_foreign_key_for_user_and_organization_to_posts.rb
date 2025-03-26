# frozen_string_literal: true

class AddForeignKeyForUserAndOrganizationToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :users, foreign_key: true, index: true
    add_reference :posts, :organizations, foreign_key: true, index: true
  end
end
