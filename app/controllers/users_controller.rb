class UsersController < ApplicationController
  skip_before_action :authorize, only: [:get_current_user, :create]
  before_action :authorized, only: [:get_current_user, :create]

  def index
    render json: User.all
  end

  def get_current_user
    render json: current_user
  end

  # signup
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.permit(:username, :password)
    end
end
