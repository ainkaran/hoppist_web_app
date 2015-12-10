Rails.application.routes.draw do
  root "react#index"

  namespace :alpha do
    get "/beer_reviewer" => "reviews#start"
    post "/beer_reviewer" => "reviews#save_user"
    get "/end" => "reviews#end"
    resources :reviews, only: [:new, :create]
    resources :breweries do
      resources :beers
    end
  end
end
