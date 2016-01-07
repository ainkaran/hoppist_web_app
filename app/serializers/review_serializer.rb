class ReviewSerializer < ActiveModel::Serializer
  attributes :id,
             :author_id,
             :author_name,
             :date,
             :body,
             :star_rating,
             :colour_rating,
             :flavour_rating

  def author_id
    object.user.id
  end

  def author_name
    UserSerializer.new(object.user).display_name
  end

  def date
    object.created_at.strftime("%B %-d, %Y")
  end
end
