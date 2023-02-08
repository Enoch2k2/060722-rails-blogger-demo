class RemoveUserFromBlogs < ActiveRecord::Migration[6.1]
  def change
    remove_column :blogs, :user, :string
  end
end
