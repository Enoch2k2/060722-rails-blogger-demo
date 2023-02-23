class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def get_current_user
    # render json of the currently logged in user
    if logged_in?
      render json: current_user
    else
      render json: { message: "Not Logged In"}, status: :unauthorized # 422
    end
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
