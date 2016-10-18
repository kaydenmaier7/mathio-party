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


User.create(user1)
Game.create(game1)
Game.create(game2)

Match.create({game_id: 1})

# create results for 2 matches
2.times do |num|
  Result.create({
    user_id: 1,
    match_id: num,
    score: 5
  })

  # create sub_skills
  10.times do |integer|
    SubSkill.create({
      result_id: num + 1,
      name: "#{integer} times tables",
      skill_name: "multiplication",
      correct: integer * 10,
      incorrect: 10
    })
  end
end

