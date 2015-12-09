Rails.application.routes.draw do
  root "react#index"

  namespace :alpha do
    resources :breweries do
      resources :beers
    end
  end
end
