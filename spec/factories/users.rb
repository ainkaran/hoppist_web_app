FactoryGirl.define do
  factory :user do
    first_name "Johnny"
    last_name "Appleseed"
    email "johnny@apple.com"
    password "digestif"

    factory :admin_user do
      is_admin true
    end
  end

end
