class Match < ApplicationRecord
  has_many 	 :results
  has_many   :sub_skills
  belongs_to :game
end
