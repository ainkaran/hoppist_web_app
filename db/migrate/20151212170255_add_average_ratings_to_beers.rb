class AddAverageRatingsToBeers < ActiveRecord::Migration
  def change
    add_column :beers, :coord_x_flavour, :float
    add_column :beers, :coord_y_colour,  :float
    add_column :beers, :avg_star_rating, :float
  end
end
