Rails.application.routes.draw do
  get 'players/new' => 'players#new'

  post 'players' => 'players#create'

  delete 'players/:id' => 'players#destroy'

  devise_for :users
  get 'users' => 'users#index'
	get 'users/:id' => 'users#show'

  get 'games' => 'games#index'
  get 'games/:id' => 'games#show'

  post 'results' => 'results#create'

  root 'games#index'
end
