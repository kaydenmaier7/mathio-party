class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise 	 :database_authenticatable, :registerable,
         	 :recoverable, :rememberable, :trackable, :validatable
  has_many :results
  has_many :matches, through: :results
  has_many :games, through: :matches
  has_many :sub_skills, through: :results

  def percent(result, skill, sub_skill, match)

    collection = self.sub_skills
      .where(skill_name: skill)
      .where(name: sub_skill)

    correct = collection
      .where(correct: 1)
      .count()

    incorrect = collection
      .where(incorrect: 1)
      .count
      # add this line to get a specific match
      # .where(match: match)

    total = correct + incorrect

    if result == 'correct'
      (correct.to_f / total.to_f).round(2)
    else
      (incorrect.to_f / total.to_f).round(2)
    end
  end
end
