class MatchesController < ApplicationController
  include MatchesHelper

  def show
    @match = Match.find(params[:id])
    @results = parse_match(@match)
  end

end
