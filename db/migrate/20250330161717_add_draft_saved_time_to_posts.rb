# frozen_string_literal: true

class AddDraftSavedTimeToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :drafted_at, :datetime
  end
end
