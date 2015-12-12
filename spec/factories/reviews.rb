FactoryGirl.define do
  factory :review do
    association :user, factory: :user
    association :beer, factory: :beer
    body "This beer tastes like candy!"
    sequence(:star_rating)    { rand(5)  + 1 }
    sequence(:colour_rating)  { rand(12) + 1 }
    sequence(:flavour_rating) { rand(12) + 1 }
  end

end
