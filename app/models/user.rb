class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise 	 :database_authenticatable, :registerable,
         	 :recoverable, :rememberable, :trackable, :validatable
  has_many :results
  has_many :games, through: :results

  def percent(result, skill)
    results = self.results.where(skill: skill)
    correct = results.pluck(:correct).inject { |sum, n| sum + n }.to_f
    incorrect = results.pluck(:incorrect).inject { |sum, n| sum + n }.to_f
    total = correct + incorrect

    if result == 'correct'
      (correct / total * 100).round / 100.0
    else
      (incorrect / total * 100).round / 100.0
    end
  end
end
