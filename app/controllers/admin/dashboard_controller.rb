class Admin::DashboardController < Admin::BaseController
  def index
    @beers      = Beer.last(5)
    @breweries  = Brewery.last(5)
    @users      = User.last(5)
    @reviews    = Review.last(5)
  end
end
