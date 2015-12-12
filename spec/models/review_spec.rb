require 'rails_helper'

RSpec.describe Review, type: :model do
  let(:user) { FactoryGirl.create(:user) }
  describe "validations" do
    def valid_attributes(new_attributes = {})
      {
        body: "This beer tastes like candy - and I love it",
        user: user,
        star_rating: 5,
        colour_rating: 1,
        flavour_rating: 8
      }.merge(new_attributes)
    end

    it "is associated with a user" do
      review = Review.new(valid_attributes)
      expect(review.user).to be_a(User)
    end

    it "is invalid without a user" do
      review = Review.new(valid_attributes(user: nil))
      expect(review).to be_invalid
    end

    # TODO: work on validations for this allowing reviews to have a combination
    # of body, star rating, flavour/colour, etc

    it "disallows star ratings outside of 1 and 5" do
      review = Review.new(valid_attributes(star_rating: 6))
      expect(review).to be_invalid
    end

    it "disallows colour ratings outside of 1 and 12" do
      review = Review.new(valid_attributes(colour_rating: 13))
      expect(review).to be_invalid
    end

    it "allows flavour ratings between 1 and 12" do
      review = Review.new(valid_attributes(flavour_rating: 0))
      expect(review).to be_invalid
    end
  end

  describe "average ratings" do
    it "updates the associated beer's average ratings on creation" do
      beer   = FactoryGirl.create(:beer)
      review = Review.new(FactoryGirl.attributes_for(:review))
      review.beer = beer
      review.user = user

      expect do
        review.save
      end.to change(beer, :updated_at)

    end
  end
end
