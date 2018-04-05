require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'djt', email: 'djt@djt.com', password: 'deejaytee', password_confirmation: 'deejaytee')
  end
  
  test "User with valid credentials should be valid" do
    assert @user.valid?
  end

  test "Empty name is not valid" do
    @user.name = "   "
    assert_not @user.valid?
  end

  test "Empty email is not valid" do
    @user.email = "   "
    assert_not @user.valid?
  end

  test "Empty password is not valid" do
    @user.password = "   "
    assert_not @user.valid?    
  end

  test "Wrong password confirmation is not valid" do
    @user.password_confirmation = "   "
    assert_not @user.valid?
  end

  test "Short password is not valid" do
    @user.password = "foo"
    @user.password_confirmation = "foo"
    assert_not @user.valid?
  end
end
