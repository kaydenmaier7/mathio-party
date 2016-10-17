Rails.application.routes.draw do
  devise_for :users
  get 'users' => 'users#index'
	get 'users/:id' => 'users#show'

  get 'games' => 'games#index'
  get 'games/:id' => 'games#show'

  post 'results' => 'results#create'

  root 'games#index'
end
