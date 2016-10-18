class SubSkill < ApplicationRecord
  belongs_to :skill
  belongs_to :result
end
