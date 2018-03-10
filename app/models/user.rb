class User < ApplicationRecord
  validates :name, :presence: true, length: {maximum: 50}
  calidates :email, :presence: true, length: {maximum: 255}
end
