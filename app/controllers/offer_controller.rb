class OfferController < ApplicationController
  before_action :logged_in_user, only: [:create, :edit, :update, :show, :destroy]
  before_action :correct_user, only: [:edit, :update, :show, :destroy]

  def show
    @offer = Offer.find(params[:id])
    render json: @offer
  end

  def new
    @offer = Offer.new
  end

  def create
    @offer = Offer.new(offer_params)
    if @offer.save
      redirect_to @offer
    else
      render 'new'
    end
  end

  def edit
    @offer = Offer.find(params[:id])
  end

  def update
    @offer = Offer.find(params[:id])
    if @offer.update(offer_params)
      redirect_to @offer
    else
      render 'edit'
    end
  end

  def destroy
    @offer = Offer.find(params[:id])
    @offer.destroy
  end

  private
  def interview_params
    params.require(:offer).permit(:salary, :benefits, :acceptby)
  end

    def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in"
      redirect_to login_url unless current_user?(@user)
    end
  end

  def correct_user
    @offer = current_user.offers.find_by(id: params[:id])
    redirect_to root_url if @offer.nil?
  end
end
