class AddCategoryReferenceToBeers < ActiveRecord::Migration
  def change
    add_reference :beers, :category, index: true, foreign_key: true
  end
end
