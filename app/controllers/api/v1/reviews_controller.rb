class Api::V1::ReviewsController < ApplicationController
  def create
    review       = Review.new(review_params)
    review.user  = User.first # TODO: replace with current_user

    if review.save
      render json: review
    else
      render json: review.errors.messages
    end
  end

  private
  def review_params
    params.require(:review).permit([:beer_id,
                                    :body,
                                    :star_rating,
                                    :colour_rating,
                                    :flavour_rating
                                    ])
  end
end
