class Game < ApplicationRecord
	has_many :matches
	has_many :results, through: :matches
	has_many :users, through: :results
end
