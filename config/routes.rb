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
  get     '/ui/*react', to: "react#index"
  post    '/ui/*react', to: "react#index"
  patch   '/ui/*react', to: "react#index"
  put     '/ui/*react', to: "react#index"
  delete  '/ui/*react', to: "react#index"

end
