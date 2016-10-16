Rails.application.routes.draw do
  devise_for :users
  get 'users/index'
	get 'users/show'

  get 'games/index'
  get 'games/show'

  root 'games#index'
end
