class BeerSerializer < ActiveModel::Serializer
  # TODO: how do we return links with these responses?
  # I'll have to hardcode the paths into the React side
  # for now.
  attributes :id,
             :name,
             :avg_star_rating,
             :avg_flavour_rating,
             :avg_colour_rating,
             :num_reviews,
             :category,
             :abv,
             :ibu,
             :available_in_growlers,
             :available_in_bottles_cans


  belongs_to :brewery
end
