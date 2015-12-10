Beer.destroy_all

10.times do
  begin
    FactoryGirl.create(:beer)
  rescue
    next
  end
end
