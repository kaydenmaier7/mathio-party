class MatchesController < ApplicationController
  include MatchesHelper

  def show
    @match = Match.find(params[:id])
  end

end
