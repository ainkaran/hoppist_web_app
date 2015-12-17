class Admin::BeersController < Admin::BaseController
  before_action :beer_by_id, only: [:show, :edit, :update]

  def new
    @beer = Beer.new
    @breweries = Brewery.all.order(:name) # for the form dropdown
  end

  def create
    @beer = Beer.new(beer_params)

    if @beer.save
      flash[:notice] = "Beer saved."
      redirect_to admin_beer_path(@beer)
    else
      render :new
    end

  end

  def index
    case params[:mode]
    when "missing_photo"
      # find all beers that have a colour/flavour rating but no photo
      @beers = Beer.where("label_image IS NULL AND avg_flavour_rating IS NOT NULL AND avg_colour_rating IS NOT NULL");
    else
      @beers = Beer.all.order(:name)
    end
  end

  def show
    @beer = Beer.find(params[:id])
  end

  def edit
    @beer = Beer.find(params[:id])
  end

  def update
    if @beer.update(beer_params)
      flash[:notice] = "Beer updated."
      redirect_to admin_beer_path(@beer)
    else
      flash[:alert] = "Couldn't save beer: #{@beer.errors.messages.inspect}"
      render :edit
    end
  end

  private
  def beer_by_id
    @beer = Beer.find(params[:id])
  end

  def beer_params
    params.require(:beer).permit([:name,
                                  :brewery_id,
                                  :category_id,
                                  :abv,
                                  :ibu,
                                  :available_in_growlers,
                                  :available_in_bottles_cans,
                                  :label_image])
  end

end
