class CreateSubSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :sub_skills do |t|
      t.string :name
      t.integer :correct
      t.integer :incorrect
      t.references :skill, foreign_key: true
      t.references :result, foreign_key: true

      t.timestamps
    end
  end
end
