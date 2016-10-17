class GamesController < ApplicationController
  def index
  end

  def show
  	@game = Game.find(params[:id])
  end
end
