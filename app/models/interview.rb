class Interview < ApplicationRecord
  belongs_to :job
  default_scope -> {order(date: :desc)}
  validates :job_id, presence: true
end
