user1 = {
	username: 'mathio_party1',
	email: 'mathio_party1@gmail.com',
	password: '123456'
}

user2 = {
  username: 'joe',
  email: 'joe@joe.com',
  password: 'joejoe'
}

user3 = {
  username: 'tammy',
  email: 'tammy@tammy.com',
  password: 'tammy1'
}

game1 = {
	name: 'Frogger',
	src: '/javascripts/frogger.js',
	description: 'A spin on the classic Frogger game. Compete against other players to catch ladybugs.',
  directions: "Move around the field and catch lady bugs when the math equation above is true. If you eat a ladybug when the equation is false, your opponent will get a point. If you hit a car, you will be faded for a time and will move at a decreased speed- giving your opponent a major advantage. The first player to reach 10 points wins!",
  player1_character: 'Green Frog',
  player2_character: 'Blue Frog',
  player1_controls: 'Up Arrow: Move Up, Down Arrow: Move Down, Left Arrow: Move Left, Right Arrow: Move Right',
  player2_controls: 'W: Move Up, S: Move Down, A: Move Left, D: Move Right'
}

game2 = {
  name: 'Flappy Math',
  src: '/javascripts/flappy_math.js',
  description: 'Flappy Bird but with Math!',
  directions: "Fly through the Pipe with the correct answer to your equation to gain points. Don't hit the green pipes, fly too high, or fly too low. Doing so will temporarily knock your character out of the game- giving your opponent a major advantage. The player with the most points when the timer hits 0, wins.",
  player1_character: 'Yellow Bird',
  player2_character: 'Blue Bird',
  player1_controls: 'Up Arrow: Move up, Down Arrow: Move Down, Left Arrow: Move Left, Right Arrow: Move Right',
  player2_controls: 'W: Move Up, S: Move Down, A: Move Left, D: Move Right'
}

game3 = {
  name: 'Invasion',
  src: '/javascripts/invasion.js',
  description: "Your queen demands milk. Gather cows for your queen.",
  directions: "Use your tractor beam to grab the cow that answers your equation.",
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
User.create(user2)
User.create(user3)
Game.create(game1)
Game.create(game2)
Game.create(game3)
Game.create(game4)

10.times do
  Match.create({game_id: 1})
end

# create results for 2 matches
10.times do |num|
  Result.create({
    user_id: 1,
    match_id: (num + 1)
  })
end

10.times do |num|
  Result.create({
    user_id: 2,
    match_id: (num + 1)
  })
end

multiplication_skills = ['0 times table', '1 times table', '2 times table', '3 times table', '4 times table', '5 times table', '6 times table', '7 times table',
'8 times table', '9 times table', '10 times table', 'squares', 'numbers greater than 10']

division_skills = ['diving by 0', 'diving by 1', 'diving by 2', 'diving by 3', 'diving by 4', 'diving by 5', 'diving by 6', 'diving by 7',
'diving by 8', 'diving by 9']

addition_skills = ['numbers greater than 10', 'numbers less than 10', 'evens', 'odds', 're-grouping']

subtraction_skills = ['numbers greater than 10', 'evens', 'odds', 're-grouping']


20.times do |num|
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'multiplication',
    name: multiplication_skills.sample,
    correct: 1,
    match_id: rand(1..10)
    })
  end
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'multiplication',
    name: multiplication_skills.sample,
    incorrect: 1,
    match_id: rand(1..10)
    })
  end
end

20.times do |num|
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'addition',
    name: addition_skills.sample,
    correct: 1,
    match_id: rand(1..10)
    })
  end
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'addition',
    name: addition_skills.sample,
    incorrect: 1,
    match_id: rand(1..10)
    })
  end
end

20.times do |num|
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'subtraction',
    name: subtraction_skills.sample,
    correct: 1,
    match_id: rand(1..10)
    })
  end
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'subtraction',
    name: subtraction_skills.sample,
    incorrect: 1,
    match_id: rand(1..10)
    })
  end
end

20.times do |num|
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'division',
    name: division_skills.sample,
    correct: 1,
    match_id: rand(1..10)
    })
  end
  5.times do |x|
  SubSkill.create({
    result_id: (num + 1),
    skill_name: 'division',
    name: division_skills.sample,
    incorrect: 1,
    match_id: rand(1..10)
    })
  end
end


