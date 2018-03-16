class CreateInterviews < ActiveRecord::Migration[5.1]
  def change
    create_table :interviews do |t|
      t.datetime :date
      t.text :notes

      t.timestamps
    end
  end
end
