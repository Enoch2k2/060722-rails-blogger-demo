class User < ApplicationRecord
  has_many :blogs
  has_many :comments
  has_many :commented_blogs, through: :comments, foreign_key: "blog_id", class_name: "Blog"

  validates :username, 
    uniqueness: true, 
    presence: true

  has_secure_password # password, password=, authenticate
  # password_digest stores the encrypted password
  # has secure password already validates your password

  # password= is going to take in the value of the password given by the user, it will hash and salt the password
end
