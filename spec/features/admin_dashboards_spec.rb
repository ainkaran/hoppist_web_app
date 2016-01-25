require 'rails_helper'

RSpec.feature "AdminDashboards", type: :feature do
  let(:admin_user) { FactoryGirl.create(:admin_user) }
  def log_in_user
    visit new_admin_session_path
    fill_in "email", with: admin_user.email
    fill_in "password", with: admin_user.password
    click_button 'Login'
  end

  before do
    log_in_user
    visit admin_root_path
  end

  it "displays the dashboard page" do
    expect(page).to have_current_path(admin_root_path)
  end

  it "has a link to add a beer" do
    expect(page).to have_link "Add Beer", href: new_admin_beer_path
  end

  it "has a link to add a brewery" do
    expect(page).to have_link "Add Brewery", href: new_admin_brewery_path
  end

end
