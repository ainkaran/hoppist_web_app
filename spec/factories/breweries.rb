FactoryGirl.define do
  factory :brewery do

    sequence(:name) { |n| "Brewing Co #{n}" }
  end
end
