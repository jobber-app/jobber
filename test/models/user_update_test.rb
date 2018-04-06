require 'test_helper'

class UserUpdateTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'djt', email: 'djt@djt.com',
                         password: 'deejaytee', password_confirmation: 'deejaytee')
  end
  
  test "User with valid credentials should be valid" do
    assert @user.valid?
  end

  test "Empty name is not valid" do
    @user.name = "   "
    assert_not @user.valid?
  end

  test "Name over 50 chars is not valid" do
    @user.name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

  test "Valid email addresses are valid" do
    valid_addresses = %w[foo@bar.com a+b@boo.org thing.other-thing@x.y.z]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "Not valid email addresses are not valid" do
    invalid_addresses = %w[@bar.com org x.com a@]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should not be valid"
    end
  end

end
