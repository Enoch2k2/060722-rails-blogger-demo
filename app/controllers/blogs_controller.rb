class BlogsController < ApplicationController
  self.before_action(:find_blog, only: [:update, :destroy])
  self.before_action(:unprocessable_entity_if_not_found, only: [:update, :destroy])
  
  def index
   @blogs = Blog.all
   render json: @blogs
  end

  def create
    blog = Blog.create(blog_params)

    render json: blog, status: :created
  end

  def update # routes PATCH /blogs/:id    
      @blog.update(blog_params)
      render json: @blog
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
      params.require(:blog).permit(:title, :content, :user)
    end

    def find_blog
      @blog = Blog.find_by_id(params[:id])
    end

    def unprocessable_entity_if_not_found
      render json: { message: "Blog not found" }, status: :unprocessable_entity unless @blog
    end
end
