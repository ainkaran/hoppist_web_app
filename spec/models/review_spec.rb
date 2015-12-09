require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "validations" do
    let(:user) { FactoryGirl.create(:user) }
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

    # TODO: work on validations for this matrix
    # it "should be valid just with body and star rating" do
    #   review = Review.new(valid_attributes(colour_rating: nil, flavour_rating: nil))
    #   expect(review).to be_valid
    # end
    #
    # it "should be valid just with colour and flavour" do
    #   review = Review.new(valid_attributes(body: nil, star_rating: nil))
    #   expect(review).to be_valid
    # end

    # it "should be invalid with incomplete combinations of body/star rating \
    #     and colour/flavour" do
    #     # this review just has a star rating and a flavour rating. should be invalid
    #     review = Review.new(valid_attributes(body: nil, colour_rating: nil))
    #     expect(review).to be_invalid
    #
    #     # this review just has a colour rating and a star rating. should be invalid
    #     review = Review.new(valid_attributes(body: nil, flavour_rating: nil))
    #     expect(review).to be_invalid
    #
    #     # this review just has a colour rating. should be invalid
    #     review = Review.new(valid_attributes(body: nil, star_rating: nil, flavour_rating: nil))
    #     expect(review).to be_invalid
    #
    #     # this review just has a body. should be invalid
    #     review = Review.new(valid_attributes(star_rating: nil, flavour_rating: nil, colour_rating: nil))
    #     expect(review).to be_invalid
    # end

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
end
