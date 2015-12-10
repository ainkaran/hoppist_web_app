class Beer < ActiveRecord::Base
  belongs_to :brewery
  has_many :reviews
  has_many :review_authors, through: :reviews, source: :user

  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true
end
