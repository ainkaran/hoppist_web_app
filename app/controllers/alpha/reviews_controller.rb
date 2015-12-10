class Alpha::ReviewsController < ApplicationController
  def new
    @beer   = Beer.joins('LEFT OUTER JOIN "reviews" ON "reviews"."beer_id" = "beers"."id"').where("user_id IS DISTINCT FROM 1").sample
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    @review.user = User.first
    @review.save!
    redirect_to new_alpha_review_path
  end

  private
  def review_params
    params.require(:review).permit([:body, :star_rating, :colour_rating, :flavour_rating, :beer_id])
  end
end
