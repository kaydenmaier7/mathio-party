class GamesController < ApplicationController
  def index
  end

  def show
  	@game = Game.find(params[:id])
    @match_id = Match.last.id
  end
end
