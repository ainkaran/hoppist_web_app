class Alpha::ReviewsController < ApplicationController
  def start
    redirect_to new_alpha_review_path if session[:user_id]
  end

  def save_user
    first_name = params[:first_name].downcase
    last_name = params[:last_name].downcase

    user = User.find_by(first_name: first_name, last_name: last_name)

    if !user
      user = User.new(first_name: first_name, last_name: last_name)
      user.save
      if !user.save
        render :start
        return
      end
    end


    session[:user_id] = user.id
    redirect_to new_alpha_review_path
  end


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
