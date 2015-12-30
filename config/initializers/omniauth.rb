Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :twitter,       ENV['TWITTER_API_CONSUMER_KEY'], ENV['TWITTER_API_CONSUMER_SECRET']
  provider :google_oauth2, ENV["GOOGLE_API_CLIENT_ID"], ENV["GOOGLE_API_CLIENT_SECRET"],
    {
      scope: "profile" # This requests access to "View your basic profile info"
    }
end
