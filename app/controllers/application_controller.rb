class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_player2, :player2_logged_in?

  def current_player2
  	@current_player2 ||= User.find(session[:player2]) if session[:player2]
  end

  def player2_logged_in?
  	!!current_player2
  end
end
