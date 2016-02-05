Rails.application.routes.draw do
  # This is the entry point for React.
  root "react#index"

  # Omniauth callback routes
  if Rails.env.development? || Rails.env.test?
    # The POST route is only needed for developer/test callback
    post "/auth/:provider/callback", to: "omniauth#callback"
  end
  get  "/auth/:provider/callback", to: "omniauth#callback"

  namespace :api, defaults: { format: :json } do
    get "logged_in_user", to: "base#logged_in_user"

    namespace :v1 do
      # This is a general-purpose search function. At the moment, it just searches
      # beer names, but it could be expanded to search brewery names or other
      # keywords as well.
      get "search", to: "search#new"
      resources :beers
      resources :breweries
      resources :flavour_map, only: [] do
        # This search route expects coordinates from the flavour map
        post "search", on: :collection
      end
      resources :reviews, only: [:create]
    end
  end


  namespace :admin do
    get "/" => "breweries#index"
    resources :breweries
    resources :beers
    resources :sessions, only: [:new, :create] do
      delete :destroy, on: :collection
    end
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

  # Catch /ui requests and redirect it to React.
  # Wildcard matching requires a parameter, even though we're not going to use it
  # See http://guides.rubyonrails.org/routing.html#route-globbing-and-wildcard-segments
  # TODO: I think this is a pretty awesome little hack ;)
  match '*all', to: 'application#react', via: :get

end
