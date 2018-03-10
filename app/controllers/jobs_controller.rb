class JobsController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :show]
  before_action :correct_user, only: [:edit, :update, :show]
  
  def show
    @job = Job.find(params[:id])
  end
  
  def new
      
  end

  def create
  end

  def edit
  end

  def update
  end

  private
  def job_params
  end

  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in"
      redirect_to login_url unless current_user?(@user)
    end
  end

  def correct_user
    @job = current_user.jobs.find_by(id: params[:id])
    redirect_to root_url if @micropost.nil?
  end
  
end
