require 'rails_helper'

RSpec.describe Beer, type: :model do
  describe "with valid attributes" do
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

  end
end
