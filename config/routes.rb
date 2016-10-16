Rails.application.routes.draw do
  get 'users/index'
	get 'users/show'

  get 'games/index'
  get 'games/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
