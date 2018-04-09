class AddJobRefToOffersAndInterviews < ActiveRecord::Migration[5.1]
  def change
    add_reference :offers, :job
    add_reference :interviews, :job
  end
end
