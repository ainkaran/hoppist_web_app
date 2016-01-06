class Admin::BreweriesController < Admin::BaseController
  before_action :brewery_by_id, only: [:show, :edit, :update]

  def new
    @breweries = Brewery.all.order(:name)
    @brewery = Brewery.new
  end

  def create
    @brewery = Brewery.new(brewery_params)
    if @brewery.save
      flash[:notice] = "Brewery saved."
      redirect_to alpha_admin_breweries_new_path
    else
      flash[:alert] = "Invalid brewery"
      render :new
    end
  end

  def index
    @breweries = Brewery.all.order(:name)
  end

  def show

  end

  def edit
  end

  def update
    if @brewery.update(brewery_params)
      redirect_to admin_brewery_path(@brewery)
    else
      render :edit
    end
  end


  private
  def brewery_by_id
    @brewery = Brewery.find(params[:id])
  end

  def brewery_params
    params.require(:brewery).permit([:name, :description, :url])
  end
end
