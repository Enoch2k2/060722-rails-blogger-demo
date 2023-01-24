class BlogsController < ApplicationController

  def index
   @blogs = Blog.all
   render json: @blogs
  end

  def create
    blog = Blog.create(blog_params)
    
    render json: blog
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
      params.require(:blog).permit(:title, :content, :user)
    end
end
