class Admin::SessionsController < Admin::BaseController
  skip_before_action :authenticate_user

  def new
  end

  def create
    user = User.find_by_email(params[:email])

    if user && user.is_admin? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to admin_root_path, notice: "Signed in!"
    else
      flash[:notice] = "Invalid credentials or authorization"
      render :new
    end

  end

  def destroy
    session[:user_id] = nil
    redirect_to admin_root_path, notice: "Goodbye."
  end

end
