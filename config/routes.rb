Rails.application.routes.draw do
  get 'users/index'
	get 'users/show'

  get 'games/index'
  get 'games/show'

  root 'game#index'
end
