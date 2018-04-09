class RenameDocumentTypeColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :documents, :type, :mimetype
  end
end
