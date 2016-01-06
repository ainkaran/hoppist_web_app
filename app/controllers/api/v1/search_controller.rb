class Api::V1::SearchController < Api::BaseController
  def new
    term = params[:term]
    beers = Beer.joins(:brewery).where(["beers.name ILIKE :term OR breweries.name ILIKE :term", { term: "%#{term}%" }])
    render json: beers, include: 'brewery'
  end
end
