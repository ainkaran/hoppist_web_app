class AddImageToBeers < ActiveRecord::Migration
  def change
    add_column :beers, :label_image, :string
  end
end
