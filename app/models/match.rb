class Match < ApplicationRecord
  has_many 	 :results
  belongs_to :game
end
