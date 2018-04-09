class CreateDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :documents do |t|
      t.string :title
      t.text :link
      t.text :type
      t.text :description
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
