require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'djt', email: 'djt@djt.com', password: 'deejaytee', password_confirmation: 'deejaytee')
  end

  
  test "should be valid" do
    assert @user.valid?
  end
end
