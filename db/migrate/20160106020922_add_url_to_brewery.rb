class AddUrlToBrewery < ActiveRecord::Migration
  def change
    add_column :breweries, :url, :string
  end
end
