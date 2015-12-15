class Admin::BreweriesController < Admin::BaseController
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
