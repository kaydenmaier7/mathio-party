class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise 	 :database_authenticatable, :registerable,
         	 :recoverable, :rememberable, :trackable, :validatable
  has_many :results
  has_many :matches, through: :results
  has_many :games, through: :matches
  has_many :sub_skills, through: :results

  def percent(result, skill, sub_skill)
    # fetch the sub_skills with the skill: 'skill' and name: 'sub_skill'
    results = self.sub_skills.where(skill_name: skill).where(name: sub_skill)
    correct = results.pluck(:correct).inject { |sum, n| sum + n }.to_f
    incorrect = results.pluck(:incorrect).inject { |sum, n| sum + n }.to_f
    total = correct + incorrect

    if result == 'correct'
      (correct / total).round(2)
    else
      (incorrect / total).round(2)
    end
  end
end
