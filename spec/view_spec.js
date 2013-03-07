describe("view", function() {
  beforeEach(function() {
    loadFixtures("view.html");

    this.view = new TestView({ el: "#testview" });
  });

  it("should contain #static element", function() {
    expect(this.view.$("#static")).toExist();
    expect(this.view.$("#static").text()).toEqual("static fixture element");
  });

  it("should contain #dynamic element after it is rendered", function() {
    expect(this.view.$("#dynamic")).not.toExist();
    this.view.addDynamic();
    expect(this.view.$("#dynamic")).toExist();
  });

  it("#addDynamic should invoke onFunctionCalled", function() {
    // register jasmine spy on object function
    spyOn(this.view, 'onFunctionCalled')
    this.view.addDynamic();
    expect(this.view.onFunctionCalled).toHaveBeenCalledWith("addDynamic");
  });
});
