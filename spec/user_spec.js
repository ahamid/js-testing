describe("User", function () {
  it('should create user object', function () {
    var user = Factory.build('user');
    expect(user.firstname).toBeDefined();
  });
});
