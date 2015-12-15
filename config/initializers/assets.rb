# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

# We added this because we need to include this for the admin layout, but it's
# not compiled by default.
# See: http://stackoverflow.com/a/22976830/2100285
Rails.application.config.assets.precompile += %w( application_admin.js )
