class ResultsController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true

  def create
    if request.xhr?

      player_1 = current_user.id

      player1result = Result.new(user_id: player_1, game_id: 1, correct: params[:player1correct], incorrect: params[:player1wrong])
      player2result = Result.new(user_id: current_player2.id, game_id: 1, correct: params[:player2correct], incorrect: params[:player2wrong])
      puts "*"*100
      p player1result
      p player2result

    end

  end


end
