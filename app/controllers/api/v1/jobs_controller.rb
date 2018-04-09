module Api
  module V1
    class JobsController < ApplicationController
      before_action :logged_in_user, only: [:create, :edit, :update, :show, :destroy]
      before_action :correct_user, only: [:edit, :update, :show, :destroy]
      
      def show
        @job = Job.find(params[:id])
        render json: @job
      end
      
      def new
        @job = Job.new
      end

      def create
        @job = Job.new(job_params)
        if @job.save
          redirect_to @job
        else
          render 'new'
        end
      end

      def edit
        @job = Job.find(params[:id])
      end

      def update
        @job = Job.find(params[:id])
        if @job.update(job_params)
          redirect_to @job
        else
          render 'edit'
        end
      end

      def destroy
        @job = Job.find(params[:id])
        @job.destroy
      end
      
      private
      def job_params
        params.requre(:job).permit(:title, :employer, :postlink, :posttext, :applydate, :location,
                                   :status, :coverletter, :contactdetails, :additionalinfo)
      end

      def logged_in_user
        unless logged_in?
          render html: "You have not logged in. Please log in.", status: 400
        end
      end

      def correct_user
        @job = current_user.jobs.find_by(id: params[:id])
        render html: "Your account does not have access to this resource.", status: 403 if @job.nil?
      end
      
    end
  end
end
