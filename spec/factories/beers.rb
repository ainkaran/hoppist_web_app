FactoryGirl.define do
  factory :beer do
    association :brewery, factory: :brewery

    beer_names = ["Blue Buck", "Hop Circle", "Fat Tug", "Gypsy Tears", "Hopnotist"]
    sequence(:name) { beer_names.sample }
  end

end
