class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :user, index: true, foreign_key: true
      t.text :body
      t.integer :star_rating
      t.integer :colour_rating
      t.integer :flavour_rating

      t.timestamps null: false
    end
  end
end
