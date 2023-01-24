Rails.application.routes.draw do
  resources :blogs, only: [:index, :create] # FULL CRUD! Unless otherwise
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end