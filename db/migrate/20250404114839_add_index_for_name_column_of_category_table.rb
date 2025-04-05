# frozen_string_literal: true

class AddIndexForNameColumnOfCategoryTable < ActiveRecord::Migration[7.1]
  def change
    add_index :categories, :name, unique: true
  end
end
