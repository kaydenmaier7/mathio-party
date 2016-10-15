class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.string :skill
      t.integer :correct
      t.integer :incorrect

      t.timestamps
    end
  end
end
