Beer.destroy_all # also destroys reviews
Brewery.destroy_all

100.times do
  beer = FactoryGirl.create(:beer)
  10.times do
    FactoryGirl.create(:review, beer: beer)
  end
end
