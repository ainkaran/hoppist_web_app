class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer

  validates :user, presence: true
  validates :beer, presence: true
  validates :user_id, uniqueness: { scope: :beer_id }
  # validates :body, presence: true, if: "star_rating.present?"
  # validates :flavour_rating, presence: true, if: "colour_rating.present?"
  #
  # validates :star_rating, numericality: { greater_than: 0, less_than: 6 }
  # validates :flavour_rating, numericality: { greater_than: 0, less_than: 13 }
  # validates :colour_rating, numericality: { greater_than: 0, less_than: 13 }

end
