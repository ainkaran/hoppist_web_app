class AddAverageRatingsToBeers < ActiveRecord::Migration
  def change
    add_column :beers, :avg_flavour_rating, :float
    add_column :beers, :avg_colour_rating,  :float
    add_column :beers, :avg_star_rating, :float
  end
end
