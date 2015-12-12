class BeerSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :avg_star_rating,
             :coord_x_flavour,
             :coord_y_colour
end
