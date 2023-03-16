class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :blogs, serializer: BlogSerializer
end
