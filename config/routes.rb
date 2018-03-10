Rails.application.routes.draw do
  # get 'users/new'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/home', to: 'static#home'
  get '/about', to: 'static#about'
  get '/app', to: 'react#index'
  root 'static#home'
  resources :users
end
