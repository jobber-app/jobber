Rails.application.routes.draw do
  # get 'users/new'
  # resources :users
  get '/signup', to: 'users#new'
end
