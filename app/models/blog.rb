class Blog < ApplicationRecord
  validates :title,
    presence: true,
    length: { in: 3..20 }
  validates :content,
    presence: true,
    length: { in: 3..500 }
  # validate :starts_with_t
  
  has_many :comments
  has_many :commented_users, through: :comments, foreign_key: "user_id", class_name: "User"
  belongs_to :user
  
  
  # def starts_with_t
  #  unless !self.title.blank? && self.title[0].downcase == "t"
  #   errors.add(:title, "Must start with T")
  #  end
  # end

  
end
