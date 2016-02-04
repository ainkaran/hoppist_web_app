class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer, touch: true

  validates :user, presence: true
  validates :beer, presence: true
  validates :user_id, uniqueness: { scope: :beer_id }

  # reviews can just consist of a star rating...
  validates :star_rating, presence: true, numericality: { greater_than: 0, less_than: 6 }

  # if the review has a body, it must be valid
  validates :body, length: { minimum: 10 }, if: "body.present?"

  # a review can optionally include a colour/flavour rating, but not one or the other
  with_options if: :includes_flavour_or_colour do |review|
    review.validates :flavour_rating, presence: true, numericality: { greater_than: 0, less_than: 13 }
    review.validates :colour_rating,  presence: true, numericality: { greater_than: 0, less_than: 13 }
  end

  # Truncates the review body for the admin panel
  def body_brief(length=140)
    body.length > 140 ? "#{body[0..140]}..." : body
  end

  private
  def includes_flavour_or_colour
    flavour_rating.present? || colour_rating.present?
  end

end
