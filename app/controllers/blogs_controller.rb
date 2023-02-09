class BlogsController < ApplicationController
  before_action :find_blog, only: [:update, :destroy]
  before_action :unprocessable_entity_if_not_found, only: [:update, :destroy]
  
  def index
   # determine the route that got us here, was it /blogs or /users/:user_id/blogs
  #  binding.pry
  if params[:user_id] # /users/:user_id/blogs
    user = User.find_by_id(params[:user_id])
    # grab the user

    @blogs = user.blogs
    # render the json of the blogs and the user that they belong to that belong to that user
  else # /blogs
   @blogs = Blog.all
  end
   render json: @blogs, include: [:user], except: [:user_id]
  end

  def create
    blog = Blog.create(blog_params)
    if blog.valid?
      render json: blog, include: [:user], status: :created
    else
      render json: { errors: blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update # routes PATCH /blogs/:id    
      @blog.update(blog_params)
      render json: @blog, include: [:user]
  end

  def destroy # DELETE /blogs/:id
    @blog.destroy
    render json: @blog
  end

=begin
  params sent back {
    blog: {
      title: "Some title",
      content: "Some Content",
      user: "Some User"
    }
  }
=end

  private
    def blog_params
      params.require(:blog).permit(:title, :content, :user_id)
    end

    def find_blog
      @blog = Blog.find_by_id(params[:id])
    end

    def unprocessable_entity_if_not_found
      render json: { message: "Blog not found" }, status: :unprocessable_entity unless @blog
    end
end
