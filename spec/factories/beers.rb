FactoryGirl.define do
  factory :beer do
    association :brewery, factory: :brewery
    sequence(:name) { |n| "Beer Name #{n}" }
    category "pale ale"
    abv 5.6
    ibu 55
    available_in_growlers true
    available_in_bottles_cans true

    factory :beer_with_ratings do
      sequence(:avg_star_rating) { rand(5) + 1 }
      sequence(:avg_flavour_rating) { rand(12) + 1 }
      sequence(:avg_colour_rating) { rand(12) + 1 }
    end


  end

end
