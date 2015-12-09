require 'rails_helper'

RSpec.describe Brewery, type: :model do
  describe "validations" do
    def valid_attributes(new_attributes = {})
      {
        name: "Valid Brewery Name"
      }.merge(new_attributes)
    end

    it "should have a name" do
      brewery = Brewery.new(name: nil)
      expect(brewery).to be_invalid
    end

    it "should have a unique name" do
      brewery1 = FactoryGirl.create(:brewery)
      brewery2 = Brewery.new(name: brewery1.name)
      expect(brewery2).to be_invalid
    end
  end
end
