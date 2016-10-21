class GamesController < ApplicationController
  def index
  end

  def show
  	if user_signed_in? 

  		if player2_logged_in?
				@game = Game.find(params[:id])
				@match_id = Match.last.id + 1
  		else
  			flash[:errors] = ['Player 2 must be signed in']
  			return render players_new_path
  		end

		else
			flash[:errors] = ['You must be signed to play this game']
			return redirect_to new_user_session_path
  	end
  end
end
