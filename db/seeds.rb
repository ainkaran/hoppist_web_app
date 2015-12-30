Beer.destroy_all # also destroys reviews
Brewery.destroy_all
Category.destroy_all

categories = ["Stout",
               "Porter",
               "Ale",
               "IPA",
               "Lager",
               "Pilsner",
               "Bock",
               "Sour",
               "Saison",
              "Hefeweizen",
            "Other"]

categories.each do |cat|
  Category.create!(name: cat)
end


25.times do
  brewery = FactoryGirl.create(:brewery)

  (rand(15) + 1).times do
    beer = FactoryGirl.create(:beer, brewery: brewery, category: Category.all.sample)
    (rand(20) + 1).times do
      FactoryGirl.create(:review, beer: beer)
    end
  end
end
