# frozen_string_literal: true

class AddForeignKeyOnUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :organizations, foreign_key: true, index: true
  end
end
