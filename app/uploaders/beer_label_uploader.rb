# encoding: utf-8
class BeerLabelUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  # TODO: figure out a better resampling algorithm then recreate the versions
  # this will create new versions but leave the original intact.
  # https://github.com/carrierwaveuploader/carrierwave#recreating-versions
  # ----------------------------------------------------------------------------


  # The aspect ratio for *most* versions
  BASE_ASPECT =              0.83

  # A narrower aspect, currently used on the profile page
  # TODO: media queries could use a 0.83 version for desktop
  # and a 0.64 version for phone.
  NARROW_ASPECT =            0.64

  # Displayed on the beer profile page; there is a media query for the mobile
  # version that resizes this one
  PROFILE_MAX_WIDTH =        176

  # The beer card displayed in areas like the flavour map search results
  BEER_CARD_MAX_WIDTH =      88

  # Displayed on the user's profile page and on the brewery page.
  GALLERY_MAX_WIDTH =        135


  # ----------------------------------------------------------------------------

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Currently, we store the original (in case we want to reprocess the files later)
  # We use versions to display on all areas of the site - never the original.



  version :profile do
    process :convert_to_jpg
    process :resize_to_fill => [BEER_CARD_MAX_WIDTH, BEER_CARD_MAX_WIDTH/NARROW_ASPECT]
  end

  version :gallery do
    process :convert_to_jpg
    process :resize_to_fill => [GALLERY_MAX_WIDTH, GALLERY_MAX_WIDTH/BASE_ASPECT]
  end

  def convert_to_jpg
    manipulate! do |img|
      img.format("jpg")
      img
    end
  end

  def filename
    "#{model.beer_label_filename}.jpg"
  end

  # TODO: make a fallback image
  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

end
