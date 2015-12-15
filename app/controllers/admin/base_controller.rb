class Admin::BaseController < ApplicationController
  layout "admin"
  before_action :authenticate_user

  def current_user
    @current_user ||= User.find_by_id session[:user_id] if session[:user_id]
  end

  def user_signed_in?
    current_user.present?
  end

  def authenticate_user
    unless user_signed_in? && current_user.is_admin?
      redirect_to new_admin_session_path, notice: "You must be signed in to access this area."
    end
  end

  helper_method :current_user
  helper_method :user_signed_in?
  helper_method :authenticate_user

end
