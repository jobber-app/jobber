Rails.application.routes.draw do
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/home', to: 'static#home'
  get '/about', to: 'static#about'
  get '/blog', to: 'static#blog'
  get '/survey', to: 'static#survey'
  get '/app', to: 'react#index'

  resources :users
  
  root 'static#home'
  namespace :api do
    namespace :v1 do

      resources :jobs
    end
  end
end
