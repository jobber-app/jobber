module Api
  module V1
    class DocumentsController < ApplicationController
      before_action :logged_in_user, only: [:create, :edit, :update, :show, :destroy]
      before_action :correct_user, only: [:edit, :update, :show, :destroy]

      def show
        @document = Document.find(params[:id])
        render json: @document
      end
      
      def new
        @document = Document.new
      end

      def create
        @document = Document.new(document_params)
        if @document.save
          redirect_to @document
        else
          render 'new'
        end
      end

      def edit
        @document = Document.find(params[:id])
      end

      def update
        @document = Document.find(params[:id])
        if @document.update(document_params)
          redirect_to @document
        else
          render 'edit'
        end
      end

      def destroy
        @document = Document.find(params[:id])
        @document.destroy
      end

      private
      def document_params
        params.require(:document).permit(:title, :link, :type, :description)
      end
      
      def logged_in_user
        unless logged_in?
          render html: "You have not logged in. Please log in.", status: 400
        end
      end

      def correct_user
        @document = current_user.documents.find_by(id: params[:id])
        render html: "Your account does not have access to this resource.", status: 403 if @document.nil?
      end
    end
  end
end


