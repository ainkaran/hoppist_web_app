class RemoveCategoryFieldFromBeers < ActiveRecord::Migration
  def change
    remove_column :beers, :category
  end
end
