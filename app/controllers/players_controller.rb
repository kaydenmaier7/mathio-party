class PlayersController < ApplicationController
  def new
  end

  def create
  	@current_player2 = User.find_by(email: player_params[:email])
  	if @current_player2 && @current_player2.valid_password?(player_params[:password])
  		session[:player2] = @current_player2.id
  		redirect_to root_path
  	else
  		@errors = ['Invalid login']
  		render 'new'
  	end
  end

  def destroy
  end

  private
  def player_params
  	params.require(:player).permit(:email, :password)
  end
end
