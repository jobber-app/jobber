require 'test_helper'

class UserCreateTest < ActiveSupport::TestCase
  def setup
    @name = 'djt'
    @email = 'djt@djt.com'
    @password = 'deejaytee'
  end
  
  test "User with empty name is not valid" do
    @user = User.new(name: ' ', email: @email,
                         password: @password,
                         password_confirmation: @password)
    assert_not @user.valid?
  end

  test "User with empty email is not valid" do
    @user = User.new(name: @name, email: ' ',
                         password: @password,
                         password_confirmation: @password)
    assert_not @user.valid?
  end

  test "User with empty password is not valid" do
    @user = User.new(name: @name, email: @email,
                         password: '',
                         password_confirmation: '')
    assert_not @user.valid?
  end

  test "User with incorrect password confirmation is not valid" do
    @user = User.new(name: @name, email: @email,
                         password: @password,
                         password_confirmation: 'foo')
    assert_not @user.valid?
  end

  test "User with too short password is not valid" do
    @user = User.new(name: @name, email: @email,
                         password: 'foo',
                         password_confirmation: 'foo')
    assert_not @user.valid?
  end
  
  test "User with all valid credentials is valid" do
    @user = User.new(name: @name, email: @email,
                         password: @password,
                         password_confirmation: @password)
    assert @user.valid?
  end
end
