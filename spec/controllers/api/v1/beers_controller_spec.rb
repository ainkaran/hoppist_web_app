require 'rails_helper'

RSpec.describe Api::V1::BeersController, type: :controller do
  before do
    begin
      10.times do
        b = FactoryGirl.build(:beer)
        b.save
      end
    rescue
      byebug
    end
  end

  let(:beer) { Beer.last }

  describe "#index" do
    it "returns all beers" do
      get :index
      json = JSON.parse(response.body)
      expect(json["data"].count).to eq(Beer.all.count)
    end
  end

  describe "#show" do
    # TODO: the response doesn't get wrapped in an array so we can test it like above.
    pending "returns a single beer" do
      get :show, { id: beer.id }
      json = JSON.parse(response.body)
      expect(json["data"].count).to eq(1)
    end

    it "includes the beer ID" do
      get :show, { id: beer.id }
      json = JSON.parse(response.body)
      expect(json["data"]).to include("id")
    end

    it "includes the brewery" do
      get :show, { id: beer.id }
      json = JSON.parse(response.body)
      expect(json["data"]["relationships"]).to include("brewery")
      expect(json["included"][0]["attributes"]).to include("name")
    end
  end

end
