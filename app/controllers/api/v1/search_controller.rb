class Api::V1::SearchController < Api::BaseController
  def new
    term = params[:term]
    beers = Beer.where(["name ILIKE :term", { term: "%#{term}%" }])
    render json: beers, include: 'brewery'
  end
end
