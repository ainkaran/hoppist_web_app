FactoryGirl.define do
  factory :user do
    first_name "Johnny"
    last_name "Appleseed"
    email "johnny@apple.com"
    password_digest "digestif"
  end

end
