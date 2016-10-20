class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :name
      t.string :src
      t.text 	 :description
      t.text	 :directions
      t.string :player1_character 
      t.string :player2_character
      t.text 	 :player1_controls
      t.text 	 :player2_controls
      
      t.timestamps
    end
  end
end
