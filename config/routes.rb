Rails.application.routes.draw do
  # This is the entry point for React.
  root "react#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :beers
      resources :breweries
      resources :flavour_map, only: [] do
        post "search", on: :collection
      end
    end
  end


  namespace :admin do
    resources :breweries
    resources :beers
  end

  # For the 'survey' microsite.
  namespace :alpha do
    get "/beer_reviewer" => "reviews#start"
    post "/beer_reviewer" => "reviews#save_user"
    get "/end" => "reviews#end"

    # admin
    # get  "/admin/breweries/new" => "breweries#new"
    # post "/admin/breweries" => "breweries#create"
    # get  "/admin/breweries/:id" => "breweries#admin_show", as: :admin_brewery_show

    resources :reviews, only: [:new, :create]
    resources :breweries, only: [:index, :show] do
      resources :beers
    end
    resources :beers, only: [:index]
  end

  # Catch all other requests and redirect it to the UI.
  # Wildcard matching requires a parameter, even though we're not going to use it
  # See http://guides.rubyonrails.org/routing.html#route-globbing-and-wildcard-segments
  # TODO: I think this is a pretty awesome little hack ;)
  get     '/*react', to: "react#index"
  post    '/*react', to: "react#index"
  patch   '/*react', to: "react#index"
  put     '/*react', to: "react#index"
  delete  '/*react', to: "react#index"

end
