class AddNameToGroups < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :name, :string ,null: false, unique: true
  end
end
