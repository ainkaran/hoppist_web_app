FactoryGirl.define do
  factory :beer do
    association :brewery, factory: :brewery
    sequence(:name) { |n| "#{Faker::Lorem.word} Lager #{n}" }

    factory :beer_with_ratings do
      sequence(:avg_star_rating) { rand(5) + 1 }
      sequence(:coord_x_flavour) { rand(12) + 1 }
      sequence(:coord_y_colour) { rand(12) + 1 }
    end


  end

end
