class AddAttributesToBeers < ActiveRecord::Migration
  def change
    add_column :beers, :category, :string
    add_column :beers, :abv, :float
    add_column :beers, :ibu, :integer
    add_column :beers, :available_in_growlers, :boolean
    add_column :beers, :available_in_bottles_cans, :boolean
  end
end
