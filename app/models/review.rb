class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer, touch: true

  validates :user, presence: true
  validates :beer, presence: true
  validates :user_id, uniqueness: { scope: :beer_id }

end
