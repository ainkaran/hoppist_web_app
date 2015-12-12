class Api::V1::FlavourMapController < Api::BaseController
  DEFAULT_SEARCH_RADIUS = 1

  def search
    radius = params[:radius].nil? ? DEFAULT_SEARCH_RADIUS : params[:radius].to_i
    coords = params[:coords]
    min_x  = coords["x"].to_i - radius
    max_x  = coords["x"].to_i + radius
    min_y  = coords["y"].to_i - radius
    max_y  = coords["y"].to_i + radius
    beers  = Beer.where(["avg_flavour_rating BETWEEN :min_x AND :max_x \
                          AND avg_colour_rating BETWEEN :min_y AND :max_y",
                          { min_x: min_x, max_x: max_x, min_y: min_y, max_y: max_y }
                        ])
    render json: beers
  end
end
