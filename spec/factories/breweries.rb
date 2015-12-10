FactoryGirl.define do
  factory :brewery do

    sequence(:name) { |n| "#{Faker::Lorem.word} Brewing Co #{n}" }
  end
end
