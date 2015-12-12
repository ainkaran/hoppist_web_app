require 'rails_helper'

RSpec.describe FlavourMapController, type: :controller do
  let(:brewery) { FactoryGirl.create(:brewery) }

  describe "#search" do
    def valid_beer_attributes(new_attributes = {})
      {
        name:
      }.merge(new_attributes)
    end
  end
end
