Rails.application.routes.draw do
  root "react#index"

  namespace :alpha do
    resources :reviews, only: [:new, :create]
    resources :breweries do
      resources :beers
    end
  end
end
