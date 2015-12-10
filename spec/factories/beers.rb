FactoryGirl.define do
  factory :beer do
    association :brewery, factory: :brewery

    sequence(:name) { |n| "#{Faker::Lorem.word} Lager #{n}" }
  end

end
