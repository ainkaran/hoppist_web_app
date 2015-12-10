class AddBeerReferenceToReviews < ActiveRecord::Migration
  def change
    add_reference :reviews, :beer, index: true, foreign_key: true
  end
end
