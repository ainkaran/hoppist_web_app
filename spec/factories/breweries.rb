FactoryGirl.define do
  factory :brewery do
    sequence(:name) { |n| "Brewing Co #{n}" }
    url "http://brewery.com"
  end
end
