class CreateInterviews < ActiveRecord::Migration[5.1]
  def change
    create_table :interviews do |t|
      t.timestamp :date
      t.text :notes

      t.timestamps
    end
  end
end
