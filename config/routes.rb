Rails.application.routes.draw do
  resources :users, only: [:index]
  resources :blogs, except: [:show] # FULL CRUD! Unless otherwise
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/users/:user_id/blogs", to: "blogs#index"

  post "/signup", to: "users#create"

  get "/whats-the-cookies", to: "blogs#get_cookies_and_display"
end