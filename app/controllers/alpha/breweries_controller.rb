class Alpha::BreweriesController < ApplicationController
  def new
    @breweries = Brewery.all.order(:name)
    @brewery = Brewery.new
  end

  def create
    @brewery = Brewery.new(brewery_params)
    if @brewery.save
      flash[:notice] = "Brewery saved."
      redirect_to new_alpha_brewery_path
    else
      flash[:alert] = "Invalid brewery"
      render :new
    end
  end

  def index
    @breweries = Brewery.all.order(:name)
  end

  def show
    @brewery = Brewery.find(params[:id])
  end


  def admin_show
    @brewery = Brewery.find(params[:id])
  end

  private
  def brewery_params
    params.require(:brewery).permit([:name])
  end
end
