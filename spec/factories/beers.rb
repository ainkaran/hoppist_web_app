FactoryGirl.define do
  factory :beer do
    association :brewery, factory: :brewery
    sequence(:name) { |n| "#{Faker::Lorem.sentence} #{n} #{rand(4)}" }

    factory :beer_with_ratings do
      sequence(:avg_star_rating) { rand(5) + 1 }
      sequence(:avg_flavour_rating) { rand(12) + 1 }
      sequence(:avg_colour_rating) { rand(12) + 1 }
    end


  end

end
