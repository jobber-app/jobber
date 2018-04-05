class CreateOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.string :salary
      t.text :benefits
      t.timestamp :acceptby

      t.timestamps
    end
  end
end
