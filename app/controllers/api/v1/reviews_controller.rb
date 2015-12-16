class Api::V1::ReviewsController < Api::BaseController
  def create
    review       = Review.new(review_params)
    review.user  = User.first # TODO: replace with current_user

    if review.save
      render json: review
    else
      # TODO: This doesn't follow JSON API 1.0 spec. Wouldn't it be nice ;)
      render json: review.errors, status: :bad_request
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
