class Api::BaseController < ActionController::API
  before_action :authenticate_request, only: [:current_user]

  def current_user
    # TODO: adding a serializer for this, either implicitly or explicitly, causes
    # a stack overflow. why? is it b/c of the instance variable?
    render json: @current_user, only: [:first_name, :last_name]
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
