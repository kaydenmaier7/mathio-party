user1 = {
	username: 'mathio_party1',
	email: 'mathio_party1@gmail.com',
	password: '123456'
}

game1 = {
	name: 'Frogger',
	src: '/javascripts/frogger.js',
	description: 'A spin on the classic Frogger game. Compete against other players to catch ladybugs.',
  directions: "Move around the field and catch lady bugs with the math equation above is true. If you eat a ladybug when the equation is false, your opponent will get a point. If you hit a car, you will be faded for a time and will move at a decreased speed- giving your opponent a major advantage. The first player to reach 10 points wins!",
  player1_character: 'Green Frog',
  player2_character: 'Blue Frog',
  player1_controls: 'Up Arrow: Move up, Down Arrow: Move Down, Left Arrow: Move Left, Right Arrow: Move Right',
  player2_controls: 'W: Up, S: Down, A: Left, D: Right'
}

game2 = {
  name: 'Flappy Math',
  src: '/javascripts/flappy_math.js',
  description: 'Flappy Bird but with Math!',
  directions: "Fly through the Pipe with the correct answer to your equation to gain points. Don't hit the green pipes, fly too high, or fly too low. Doing so will temporarily be knocked out of the game- giving your opponent a major advantage. The player with the most points when the timer hits 0, wins.",
  player1_character: 'Green Frog',
  player2_character: 'Blue Frog',
  player1_controls: 'Up Arrow: Move up, Down Arrow: Move Down, Left Arrow: Move Left, Right Arrow: Move Right',
  player2_controls: 'W: Up, S: Down, A: Left, D: Right'
}

game3 = {
  name: 'Invasion',
  src: '/javascripts/invasion.js',
  description: "Your queen demands milk. Gather cows for your queen.",
  directions: "Use your tracker beam to grab the cow that answers your equation.",
  player1_character: "Green Ship",
  player2_character: "Red Ship",
  player1_controls: "Down Arrow: Tractor Beam, Left Arrow: Move Left, Right Arrow: Move Right",
  player2_controls: "2: Tractor Beam, 1: Move Left, 3: Move Right "
}

game4 = {
  name: 'Duck Hunt',
  src: '/javascripts/duck_hunt.js',
  description: 'Duck hunt....with MATH!!',
  directions: 'The ducks had it coming',
  player1_character: "placeholder text",
  player2_character: "placeholder text",
  player1_controls: "placeholder text",
  player2_controls: "placeholder text",
}

User.create(user1)
Game.create(game1)
Game.create(game2)
Game.create(game3)
Game.create(game4)

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

2.times do |num|
  10.times do |integer|
    SubSkill.create({
      result_id: 1,
      name: "Addends of #{integer}",
      skill_name: "addition",
      correct: possible_correct.sample,
      incorrect: possible_incorrect.sample,
      match_id: num + 1
    })
  end
end
