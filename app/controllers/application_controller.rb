class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize

  def logged_in?
    !!session[:user_id] # boolean value true
  end

  def current_user
    User.find_by_id(session[:user_id])
  end

  def authorize
    render json: { errors: ["You must be logged in"]}, status: :unauthorized unless logged_in?
  end

  def authorized
    render json: { errors: ["You are already logged in, please log out first."]}, status: :unauthorized if logged_in?
  end

  def authorize_user_resource(user_id) # from the resource
    render json: { errors: ["You do not have permissions for this resource"]}, status: :unauthorized unless user_id == current_user.id
  end
end
