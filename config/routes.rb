Rails.application.routes.draw do
  get 'documents/new'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/home', to: 'static#home'
  get '/about', to: 'static#about'
  get '/blog', to: 'static#blog'
  get '/app/*all', :all => /.*/, to: 'react#index'
  get '/app',                    to: 'react#index'

  get '/survey', to: 'survey#index'
  post '/survey', to: 'survey#respond'
  get '/thanks', to: 'survey#thanks'
  
  root 'static#home'
  namespace :api do
    namespace :v0 do
      resources :users do 
        resources :documents
        resources :jobs do
          resources :interviews
          resources :offers
        end
      end
    end
  end
end
