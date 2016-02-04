source 'https://rubygems.org'

# for heroku
ruby '2.2.3'
gem 'rails_12factor', group: :production
gem 'puma'


gem 'rails', '4.2.4'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'haml-rails' # for the alpha site
gem 'slim-rails' # for the admin site
gem 'rails-api'
# using the GitHub version to get built-in support for JSON API 1.0
gem 'active_model_serializers', git: 'https://github.com/rails-api/active_model_serializers.git'
gem 'bcrypt', '~> 3.1.7'
gem 'cancancan'
gem 'carrierwave'
gem 'mini_magick'
gem 'simple_form'
gem 'fog'
gem 'omniauth-twitter'
gem 'omniauth-google-oauth2'
gem 'jwt'

# Required for Omniauth with Google (and possibly others).
# See https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview#openssl
gem 'certified'

group :development, :test do
  gem 'byebug'
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'faker'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'nyan-cat-formatter'
  gem 'spring'
  gem 'interactive_editor'
  gem 'awesome_print'
  gem 'hirb'
  gem 'rack-cors', :require => 'rack/cors'
end
