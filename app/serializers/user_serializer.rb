class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :display_name

  def display_name
    last_name = object.last_name.present? ? " #{object.last_name[0].capitalize}." : nil
    "#{object.first_name}#{last_name}"
  end
end
