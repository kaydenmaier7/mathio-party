class Result < ApplicationRecord
	has_many   :sub_skills
	belongs_to :user
	belongs_to :match
end
