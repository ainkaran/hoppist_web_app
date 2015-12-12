class BeerSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :avg_star_rating,
             :avg_flavour_rating,
             :avg_colour_rating
end
