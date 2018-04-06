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

  test "User with valid email is valid" do
    valid_addresses = %w[foo@bar.com a+b@boo.org thing.other-thing@x.y.z]
    valid_addresses.each do |valid_address|
      @user = User.new(name: @name, email: valid_address,
                         password: @password,
                         password_confirmation: @password)
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "User with invalid email is not valid" do
    invalid_addresses = %w[@bar.com org x.com a@]
    invalid_addresses.each do |invalid_address|
      @user = User.new(name: @name, email: invalid_address,
                         password: @password,
                         password_confirmation: @password)
      assert_not @user.valid?, "#{invalid_address.inspect} should not be valid"
    end
  end

  test "User with duplicate email is not valid" do
    @user1 = User.create!(name: @name, email: @email,
                     password: @password,
                     password_confirmation: @password)

    @user2 = User.new(name: 'foo', email: @email,
                      password: @password,
                      password_confirmation: @password)
    
    assert_not @user2.valid?

  end

  test "User with duplicate uppercase email is not valid" do
    @user1 = User.create!(name: @name, email: @email,
                     password: @password,
                     password_confirmation: @password)

    @user2 = User.new(name: 'foo', email: @email.upcase,
                      password: @password,
                      password_confirmation: @password)
    @user2.save
    assert_not @user2.valid?
  end

  test "Email is saved as lowercase" do
    @user1 = User.create!(name: @name, email: @email.upcase,
                          password: @password,
                          password_confirmation: @password)

    assert_equal @email, @user1.reload.email
  end
  

end
