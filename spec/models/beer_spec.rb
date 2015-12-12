require 'rails_helper'

RSpec.describe Beer, type: :model do
  describe "validations" do
    let(:brewery) { FactoryGirl.create(:brewery) }
    def valid_attributes(new_attributes = {})
      {
        name: "RSpec Stout",
        brewery: brewery
      }.merge(new_attributes)
    end

    it "should have a name" do
      beer = Beer.new(name: "")
      expect(beer).to be_invalid
    end

    it "should have a unique name" do
      beer1 = FactoryGirl.create(:beer)
      beer2 = Beer.new(name: beer1.name)
      expect(beer2).to be_invalid
    end

    it "should be associated with a brewery" do
      beer = Beer.new(valid_attributes)
      expect(beer.brewery).to be_a(Brewery)
    end

    it "should be invalid without a brewery" do
      beer = Beer.new(valid_attributes(brewery:nil))
      expect(beer).to be_invalid
    end

  end

  describe "average ratings" do
    it "should have no average ratings before any reviews have been written" do
      beer = FactoryGirl.create(:beer)
      expect(beer.avg_star_rating).not_to be
      expect(beer.avg_colour_rating).not_to be
      expect(beer.avg_flavour_rating).not_to be
    end

    it "should update its average ratings when a review is saved" do
      beer = FactoryGirl.create(:beer)
      expect do
        FactoryGirl.create(:review, beer: beer)
      end.to change  { beer.avg_star_rating }
         .and change { beer.avg_flavour_rating }
         .and change { beer.avg_colour_rating }
      byebug
    end
  end
end
