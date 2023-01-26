Rails.application.routes.draw do
  resources :blogs, except: [:show] # FULL CRUD! Unless otherwise
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end