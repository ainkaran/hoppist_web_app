class Beer < ActiveRecord::Base
  belongs_to :brewery

  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true
end
