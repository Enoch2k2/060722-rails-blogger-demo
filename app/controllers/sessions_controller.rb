class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]
  before_action :authorized, only: [:create]
  # POST /login
  def create # creating a session aka session[:user_id]
    # what is login?
      # the ability to find a user and confirm that user is you by a password
    # we need to find a user that may match a username
    user = User.find_by_username(params[:username])


    # we need to confirm that user that the password matches the password that is stored
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ["Username or Password didn't match"]}, status: :unprocessable_entity
    end
  end

  # DELETE /logout
  def destroy
    session.delete :user_id
  end
end
