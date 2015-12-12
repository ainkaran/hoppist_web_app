Rails.application.routes.draw do
  # This is the entry point for React.
  root "react#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :beers
      resources :flavour_map, only: [] do
        get "search", on: :collection
        post "search", on: :collection
      end
    end
  end

  # For the 'survey' microsite.
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
