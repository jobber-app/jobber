class CreateResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :responses do |t|
      t.integer :count_simultaneous_applications
      t.text    :how_tracking
      t.text    :what_extra_documents
      t.text    :what_document_creation_softwares
      t.integer :count_different_cvs
      t.text    :what_update_frequency

      t.timestamps
    end
  end
end
