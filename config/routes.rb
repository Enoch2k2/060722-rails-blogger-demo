Rails.application.routes.draw do
  resources :comments
  resources :users, only: [:index]
  resources :blogs, except: [:show] # FULL CRUD! Unless otherwise
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/users/:user_id/blogs", to: "blogs#index"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/get-current-user", to: "users#get_current_user"
end