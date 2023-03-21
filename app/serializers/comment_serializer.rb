class CommentSerializer < ActiveModel::Serializer
  attributes :id, :blog_id, :content
  belongs_to :user
end
