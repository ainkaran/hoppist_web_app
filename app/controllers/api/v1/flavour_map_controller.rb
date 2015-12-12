class Api::V1::FlavourMapController < Api::BaseController
  def search
    beers = Beer.all
    render json: beers
  end
end
