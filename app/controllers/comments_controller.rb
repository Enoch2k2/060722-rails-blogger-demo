class CommentsController < ApplicationController
  def create
    # we want to create a comment for the current_user
    comment = current_user.comments.build(comment_params)
    # render json if it passes validations
    if comment.save
      render json: comment, status: :created
      # render error if it doesn't pass validations
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def comment_params
      params.permit(:content, :blog_id)
    end
end
