describe("view", function() {
  beforeEach(function() {
    loadFixtures("view.html");

    this.view = new TestView({ el: "#testview" });
  });

  it("static content should be found", function() {
    expect(this.view.$("#static")).toExist();
    expect(this.view.$("#static").text()).toEqual("static fixture element");
  });

  it("added dynamic element should be found after it is rendered", function() {
    expect(this.view.$("#dynamic")).not.toExist();
    this.view.addDynamic();
    expect(this.view.$("#dynamic")).toExist();
  });

});
