require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  describe "#create" do
    let(:user) { FactoryGirl.create(:user) }
    let(:beer) { FactoryGirl.create(:beer) }

    before do
      user # create a user

      # create authentication
      # TODO: there's got to be a better way to do this...
      jwt = JWT.encode({uid: user.uid, exp: 30.days.from_now.to_i}, Rails.application.secrets.secret_key_base)
      request.headers['Authorization'] = jwt
    end

    def valid_review_params(new_attributes = {})
      {
        beer_id: beer.id,
        body: "Test review - this beer taste like rat pee",
        star_rating: 5,
        colour_rating: 5,
        flavour_rating: 5
      }.merge(new_attributes)
    end

    describe "with valid attributes" do

      it "creates a new review in the db" do
        expect do
          post :create, review: valid_review_params
        end.to change { Review.count }.by(1)
      end

      it "associates the review with a beer" do
        expect do
          post :create, review: valid_review_params
        end.to change { beer.reviews.count }.by(1)
      end

      it "updates the beer's attributes when the review is saved" do
        beer1 = FactoryGirl.create(:beer, name: "Avg Rated Beer")
        expect do
          post :create, review: valid_review_params(beer_id: beer1.id)
        end.to change  { beer1.reload.avg_star_rating }
           .and change { beer1.reload.avg_colour_rating }
           .and change { beer1.reload.avg_flavour_rating }
      end

      it "associates the review with the logged-in user"

    end

    describe "with invalid attributes" do
      it "doesn't create a new review" do
        expect do
          post :create, review: valid_review_params(star_rating: nil)
        end.to_not change { Review.count }
      end
    end

  end

end
