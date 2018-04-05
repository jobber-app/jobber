class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :employer
      t.text :postlink
      t.text :posttext
      t.timestamp :applydate
      t.string :location
      t.string :status
      t.text :coverletter
      t.text :contactdetails
      t.text :additionalinfo
      t.references :user, foreign_key: true

      t.timestamps
    end

    add_index :jobs, [:user_id, :created_at]
  end
end
