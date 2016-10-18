class ResultsController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true
  include ResultsHelper

  def create
    if request.xhr?

      create_match(params)

    end

  end


end
