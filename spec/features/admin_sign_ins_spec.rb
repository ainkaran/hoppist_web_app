require 'rails_helper'

RSpec.feature "AdminSignIns", type: :feature do

  context "with a normal user" do
    let(:user) { FactoryGirl.create(:user) }

    it "doesn't log the user in" do
      visit new_admin_session_path
      fill_in "email", with: user.email
      fill_in "password", with: user.password
      click_button 'Login'
      expect(page).to have_current_path(admin_sessions_path)
    end
  end

  context "with invalid credentials" do
    it "doesn't log the user in" do
      user_email = "bad@email.com"
      user_password = "password"
      visit new_admin_session_path
      fill_in "email", with: user_email
      fill_in "password", with: user_password
      click_button 'Login'
      expect(page).to have_current_path(admin_sessions_path)
    end
  end


  context "with valid credentials" do
    let(:admin_user) { FactoryGirl.create(:admin_user)}

    it "logs the user in" do
      visit new_admin_session_path
      fill_in "email", with: admin_user.email
      fill_in "password", with: admin_user.password
      click_button 'Login'
      expect(page).to have_current_path(admin_root_path)
    end
  end
end
