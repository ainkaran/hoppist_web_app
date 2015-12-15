class Beer < ActiveRecord::Base
  belongs_to :brewery
  has_many :reviews, dependent: :destroy
  has_many :review_authors, through: :reviews, source: :user

  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true

  mount_uploader :label_image, BeerLabelUploader

  # TODO: make category a table
  validates :category, presence: true

  # TODO: is there a way we could fire this callback only on a newly created review?
  after_touch :recalculate_average_rating

  def beer_label_filename
    name.parameterize
  end

  private
  def recalculate_average_rating
    star_rating             = reviews.average(:star_rating)
    flavour_rating          = reviews.average(:flavour_rating)
    colour_rating           = reviews.average(:colour_rating)
    self.avg_star_rating    = star_rating
    self.avg_flavour_rating = flavour_rating
    self.avg_colour_rating  = colour_rating
    self.save
  end

end
