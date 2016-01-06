class BrewerySerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :url
end
