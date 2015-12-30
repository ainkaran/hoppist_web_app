class OmniauthController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:callback]

  def callback
    user = User.where(uid: auth_hash["uid"], provider: auth_hash["provider"]).first

    unless user
      user = User.new
      user.uid = auth_hash["uid"]
      user.provider = auth_hash["provider"]
      user.first_name, user.last_name = first_name_last_name_from_provider
      user.password = SecureRandom.hex(32)
      user.save
    end

    jwt = JWT.encode({uid: user.uid, exp: 1.day.from_now.to_i}, Rails.application.secrets.secret_key_base)
    redirect_to "/?jwt=#{jwt}"
  end

  private
  def first_name_last_name_from_provider
    first_name = auth_hash["info"]["name"].split(" ")[0]
    last_name  = auth_hash["info"]["name"].split(" ")[1]

    [first_name, last_name]
  end

  def auth_hash
    request.env['omniauth.auth']
  end

end
