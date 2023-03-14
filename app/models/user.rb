class User < ApplicationRecord
  has_many :blogs, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :commented_blogs, through: :comments, source: :blog

  # user.blogs # => array of blogs that we own
  # user.commented_blogs # => an array of blogs that we commented on

  validates :username,
    uniqueness: true, 
    presence: true

  has_secure_password # password, password=, authenticate
  # password_digest stores the encrypted password
  # has secure password already validates your password

  # password= is going to take in the value of the password given by the user, it will hash and salt the password
end
