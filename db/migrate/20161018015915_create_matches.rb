class CreateMatches < ActiveRecord::Migration[5.0]
  def change
    create_table :matches do |t|
      t.references :game, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
