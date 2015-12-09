FactoryGirl.define do
  factory :review do
    association :user, factory: :user
    body "This is my great review"
    star_rating { rand(5) + 1 }
    colour_rating { rand(12) + 1 }
    flavour_rating { rand(12) + 1 }
  end

end
