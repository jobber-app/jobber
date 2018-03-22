Rails.application.routes.draw do
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/home', to: 'static#home'
  get '/about', to: 'static#about'
  get '/app', to: 'react#index'

  root 'static#home'
  resources :users
  resources :jobs
end
