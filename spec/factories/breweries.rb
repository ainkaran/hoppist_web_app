FactoryGirl.define do
  factory :brewery do
    brewery_names = ["Phillips Brewing Co.", "Driftwood Brewing", "Brassneck", "33 Acres", "Whistler Brewing", "Parallel 49", "Dageraad Brewery"]

    sequence(:name) { brewery_names.sample }
  end
end
