class Offer < ApplicationRecord
  belongs_to :job
  default_scope -> {order(acceptby: :desc)}
  validates :job_id, presence: true
end
