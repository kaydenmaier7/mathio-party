class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.integer :score
      t.references :user
      t.references :match

      t.timestamps
    end
  end
end
