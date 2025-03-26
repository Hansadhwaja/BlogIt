# frozen_string_literal: true

class ChangeColumnNameInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :organizations_id, :organization_id
  end
end
