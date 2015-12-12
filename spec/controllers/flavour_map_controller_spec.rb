require 'rails_helper'

RSpec.describe Api::V1::FlavourMapController, type: :controller do
  let(:brewery) { FactoryGirl.create(:brewery) }

  describe "#search" do
    def coords_from_json(json)
      coords = []
      beers = json["data"]
      beers.each do |beer|
        coord_x = beer["attributes"]["coord_x_flavour"].round
        coord_y = beer["attributes"]["coord_y_colour"].round
        coords.push([coord_x, coord_y])
      end
      coords
    end

    # set up a group of beers that we can use to
    # ensure the search is returning correct results.
    before do
      beer_ratings = [
        [0,1],
        [1,1],
        [2,2],
        [2,3],
        [2,4],
        [3,3],
        [4,2],
        [6,3],
        [7,3],
        [9,6],
        [9,9],
        [10,6],
        [10,7]
      ].each do |flv_x, col_y|
        FactoryGirl.create(:beer_with_ratings, coord_x_flavour: flv_x, coord_y_colour: col_y)
      end
    end

    context "with valid coordinates" do
      it "returns an array of beers for a given set of coordinates" do
        # default radius of 1
        post :search, { coords: { x: 2, y: 2 } }
        json = JSON.parse(response.body)
        coords = coords_from_json(json)

        expect(json["data"].count).to eq(4)
        expect(coords).to     include([1,1],
                                      [2,2],
                                      [2,3],
                                      [3,3]
                                      )

        expect(coords).not_to include([0,1],
                                      [2,4],
                                      [4,2])
      end

      it "accepts a radius parameter for widening or narrowing the search" do
        # we'll likely just tweak this value on the backend and not expose it
        # to the user, but we should make sure it works regardless.
        post :search, { coords: { x: 2, y: 2 }, radius: 2 }
        json = JSON.parse(response.body)
        coords = coords_from_json(json)

        expect(json["data"].count).to eq(7)
        expect(coords).to     include([0,1],
                                      [2,4],
                                      [4,2]
                                      )
      end

      it "returns an empty array if no beers are found" do
        post :search, { coords: { x: 0, y: 12 } }
        json = JSON.parse(response.body)
        coords = coords_from_json(json)

        expect(json["data"].count).to eq(0)
        expect(coords).to eq([])
      end
    end

    context "with invalid coordinates" do
      it "returns an empty array for invalid coordinates" do
        post :search, { coords: { x: -99, y: 99 } }
        json = JSON.parse(response.body)
        coords = coords_from_json(json)

        expect(json["data"].count).to eq(0)
        expect(coords).to eq([])
      end
    end

  end
end
