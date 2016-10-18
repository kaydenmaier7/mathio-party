user1 = {
	username: 'mathio_party1',
	email: 'mathio_party1@gmail.com',
	password: '123456'
}

game1 = {
	name: 'Frogger',
	src: '/javascripts/frogger.js',
	description: 'Frogger with Math!',
	directions: 'You do the thing and stuff happens!'
}

game2 = {
  name: 'flappy_math',
  src: '/flappy_math/main.js',
  description: 'A second game!',
  directions: 'fly through the answer!'
}

game3 = {
  name: 'invasion',
  src: '/javascripts/invasion.js',
  description: 'Collect cows for your queen!',
  directions: 'Gather the cows you need!'
}


User.create(user1)
Game.create(game1)
Game.create(game2)
Game.create(game3)

2.times do
  Match.create({game_id: 1})
end

# create results for 2 matches
2.times do |num|
  Result.create({
    user_id: 1,
    match_id: num,
    score: 5
  })
end

possible_correct = [100, 72, 30, 50]
possible_incorrect = [50, 20]

# create sub_skills
2.times do |num|
  10.times do |integer|
    SubSkill.create({
      result_id: 1,
      name: "#{integer} times tables",
      skill_name: "multiplication",
      correct: possible_correct.sample,
      incorrect: possible_incorrect.sample,
      match_id: num + 1
    })
  end
end
