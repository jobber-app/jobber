class Job < ApplicationRecord
  attr_accessible :title, :postlink, :posttext, :applydate, :location,
                  :status, :coverletter, :contactdetails, :additionalinfo
  belongs_to :user
  default_scope -> {order(created_at: :desc)}
  validates :user_id, presence: true
  validates :title, presence: true
end
