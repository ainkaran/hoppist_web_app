require 'rails_helper'

RSpec.describe Admin::DashboardController, type: :controller do
  context "#index" do
    context "without user signed in" do
      before do
        get :index
      end

      it "redirects to sign-in path" do
        expect(response).to redirect_to new_admin_session_path
      end

      it "doesn't set current user" do
        expect(assigns(:current_user)).to_not be
      end
    end

    context "with user signed in" do
      let(:admin_user) { FactoryGirl.create(:admin_user) }

      before do
        request.session[:user_id] = admin_user.id
        get :index
      end

      it "renders the dashboard" do
        expect(response).to render_template :index
      end
    end
  end
end
