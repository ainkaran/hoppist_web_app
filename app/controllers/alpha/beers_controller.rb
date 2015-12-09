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

  private
  def beer_params
    params.require(:beer).permit([:name, :brewery])
  end

end
