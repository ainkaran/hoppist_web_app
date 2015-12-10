class Alpha::BeersController < ApplicationController
  def create
    @beer = Beer.new(beer_params)
    brewery = Brewery.find(params[:brewery_id])
    @beer.brewery = brewery

    if @beer.save
      flash[:notice] = "Beer saved"
    else
      flash[:alert] = "Error saving beer!"
    end

    redirect_to alpha_brewery_path(brewery)
  end

  def index
  end

  def show
    unless session[:user_id]
      redirect_to alpha_beer_reviewer_path
      return
    end

    @beer = Beer.find(params[:id])
    @review = Review.new
  end

  private
  def beer_params
    params.require(:beer).permit([:name, :brewery])
  end

end
