class Job < ApplicationRecord
  belongs_to :user
  has_many :interviews, dependent: :destroy
  has_many :offers, dependent: :destroy
  default_scope -> {order(created_at: :desc)}
  validates :user_id, presence: true
  validates :title, presence: true
end
