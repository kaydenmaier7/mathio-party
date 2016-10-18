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
  name: 'Other Game',
  src: '/flappy_math/main.js',
  description: 'A second game!',
  directions: 'Like the other game but completely different'
}


User.create(user1)
Game.create(game1)
Game.create(game2)

10.times do |num|
  10.times do
    Result.create({skill: "#{num}times_table",
        correct: rand(2..30),
        incorrect: rand(2..30),
        user_id: 1,
        game_id: 1
     })
  end
end

10.times do |num|
  10.times do
    Result.create({skill: "#{num}times_table",
        correct: rand(2..30),
        incorrect: rand(2..30),
        user_id: 2,
        game_id: 1
     })
  end
end


