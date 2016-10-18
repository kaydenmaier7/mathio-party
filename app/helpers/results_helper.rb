module ResultsHelper

  def create_match(params)
    player1_id = current_user.id if current_user
    player2_id = current_player2.id if current_player2
    match = Match.create(game_id: params[:game_id])
    if player1_id
      create_results(params, player1_id, match.id, 'player1')
    end
    if player2_id
      create_results(params, player2_id, match.id, 'player2')
    end
    return match.id
  end


  def create_results(params, user_id, match_id, player_id)
    player_id = 'player1' ? equations = params[:player1correct] : equations = params[:player2correct]
    player_id = 'player1' ? wrongEquations = params[:player1wrong] : wrongEquations = params[:player2wrong]

    result = Result.create(match_id: match_id, user_id: user_id)

          if equations
            equations.each do |p|
            p = p.split(' ')

                if p[1] == '+'
                  result.sub_skills.build(match_id: match_id, match_id: match_id, skill_name: 'addition', correct: 1, name: 'numbers greater than 10').save if p[0].to_i > 10 || p[2].to_i > 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', correct: 1, name: 'numbers less than 10').save if p[0].to_i < 10 && p[2].to_i < 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', correct: 1, name: 'evens').save if p[0].to_i.even? && p[2].to_i.even?
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', correct: 1, name: 'odds').save if p[0].to_i.odd? && p[2].to_i.odd?
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', correct: 1, name: 're-grouping').save if p[4].length > p[0].length || p[4].length > p[2].length

                elsif p[1] == '-'
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', correct: 1, name: 'numbers greater than 10').save if p[0].to_i > 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', correct: 1, name: 'evens').save if p[0].to_i.even? && p[2].to_i.even?
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', correct: 1, name: 'odds').save if p[0].to_i.odd? && p[2].to_i.odd?
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', correct: 1, name: 're-grouping').save if p[0].length > p[4].length || p[2].length > p[4].length

                elsif p[1] == '*'
                  11.times{ |num| result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', correct: 1, name: "#{num.to_s} times table").save if p[0] == num.to_s || p[2] == num.to_s }
                  result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', correct: 1, name: 'squares').save if p[0] ==  p[2]
                  result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', correct: 1, name: 'numbers greater than 10').save if p[0].to_i > 10 || p[2].to_i > 10

                elsif p[1] == '/'
                  10.times{ |num| result.sub_skills.build(match_id: match_id, skill_name: 'division', correct: 1, name: "dividing by #{num.to_s}").save if p[2] == num.to_s}
                end

            end
        end
        if wrongEquations
            wrongEquations.each do |p|
            p = p.split(' ')

                if p[1] == '+'
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', incorrect: 1, name: 'numbers greater than 10').save if p[0].to_i > 10 || p[2].to_i > 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', incorrect: 1, name: 'numbers less than 10').save if p[0].to_i < 10 && p[2].to_i < 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', incorrect: 1, name: 'evens').save if p[0].to_i.even? && p[2].to_i.even?
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', incorrect: 1, name: 'odds').save if p[0].to_i.odd? && p[2].to_i.odd?
                  result.sub_skills.build(match_id: match_id, skill_name: 'addition', incorrect: 1, name: 're-grouping').save if p[4].length > p[0].length || p[4].length > p[2].length

                elsif p[1] == '-'
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', incorrect: 1, name: 'numbers greater than 10').save if p[0].to_i > 10
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', incorrect: 1, name: 'evens').save if p[0].to_i.even? && p[2].to_i.even?
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', incorrect: 1, name: 'odds').save if p[0].to_i.odd? && p[2].to_i.odd?
                  result.sub_skills.build(match_id: match_id, skill_name: 'subtraction', incorrect: 1, name: 're-grouping').save if p[0].length > p[4].length || p[2].length > p[4].length

                elsif p[1] == '*'
                  11.times{ |num| result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', incorrect: 1, name: "#{num.to_s} times table").save if p[0] == num.to_s || p[2] == num.to_s }
                  result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', incorrect: 1, name: 'squares').save if p[0] ==  p[2]
                  result.sub_skills.build(match_id: match_id, skill_name: 'multiplication', incorrect: 1, name: 'numbers greater than 10').save if p[0].to_i > 10 || p[2].to_i > 10

                elsif p[1] == '/'
                  10.times{ |num| result.sub_skills.build(match_id: match_id, skill_name: 'division', incorrect: 1, name: "dividing by #{num.to_s}").save if p[2] == num.to_s}
                end

            end
        end
    # end of create_results method
    end




end
