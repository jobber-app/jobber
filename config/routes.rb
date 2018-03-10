Rails.application.routes.draw do
  # get 'users/new'
  get '/signup', to: 'users#new'
  resources :users
end
