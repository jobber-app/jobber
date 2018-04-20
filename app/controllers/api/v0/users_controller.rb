module Api
  module V0
    class UsersController < ApplicationController
      before_action :logged_in_user, only: [:edit, :update, :show]
      before_action :correct_user, only: [:edit, :update, :show]
      
      def show
        @user = User.find(params[:id])
        render json: @user
      end
      
      def new
        @user = User.new
      end

      def create
        @user = User.new(user_params)
        if @user.save
          log_in @user
          flash[:success] = "Welcome to Jobber!"
          redirect_to app_url
        else
          render 'new'
        end
      end

      def edit
        @user = User.find(params[:id])
      end

      def update
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
          flash[:success] = "User settings updated"
          redirect_to @user
        else
          render 'edit'
        end
      end
      
      private
      def user_params
        params.require(:user).permit(:name, :email, :password,
                                     :password_confirmation)
      end

      def logged_in_user
        unless logged_in?
          flash[:danger] = "Please log in"
          redirect_to login_url unless current_user?(@user)
        end
      end

      def correct_user
        @user = User.find(params[:id])
        redirect_to(root_url) unless @user == current_user
      end
      
    end
  end
end
