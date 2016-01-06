class Api::BaseController < ActionController::API
  before_action :authenticate_request, only: [:logged_in_user]

  def logged_in_user
    # NOTE: this method was previously called 'current_user', but it was causing a
    # stack overflow when rendering the JSON below. This turned out to be because
    # Active Model Serializers looks for a 'current_user' method uses it if it's
    # defined, so it was causing an infinite loop.
    render json: @current_user
  end

  private
  def authenticate_request
    begin
      uid = JWT.decode(request.headers['Authorization'], Rails.application.secrets.secret_key_base)[0]['uid']
      @current_user ||= User.find_by(uid: uid)
    rescue
      # TODO: the frontend should handle this by redirecting to sign in/up page
      render json: 'Not Authenticated', status: 401
    end
  end
end
