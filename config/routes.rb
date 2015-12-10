Rails.application.routes.draw do
  root "react#index"

  namespace :alpha do
    get "/beer_reviewer" => "reviews#start"
    post "/beer_reviewer" => "reviews#save_user"
    get "/end" => "reviews#end"

    # admin
    get  "/admin/breweries/new" => "breweries#new"
    post "/admin/breweries" => "breweries#create"
    get  "/admin/breweries/:id" => "breweries#admin_show", as: :admin_brewery_show

    resources :reviews, only: [:new, :create]
    resources :breweries, only: [:index, :show] do
      resources :beers
    end
    resources :beers, only: [:index]
  end
end
