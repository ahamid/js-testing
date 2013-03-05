function createResponse(code, data) {
  return [code, { 'Content-Type': 'application/json' }, JSON.stringify(data)];
}

describe("Todos", function () {
  beforeEach(function () {
    this.server = sinon.fakeServer.create();
    this.todos = new Todos();
  });

  afterEach(function () {
    this.server.restore();
  });

  describe('#fetch', function () {
    it('should fetch todo data', function () {
      var data = [{ id: 1, title: 'Todo 1' }];
      var response = createResponse(200, data);
      var callback = sinon.spy();

      this.server.respondWith('GET', this.todos.url, response);
      this.todos.fetch({ success: callback });
      this.server.respond();

      sinon.assert.calledWith(callback, this.todos, data);
    });

    it('should not fetch data', function () {
      var data = [{ id: 1, title: 'Todo 1' }];
      var response = createResponse(404, data);
      var callback = sinon.spy();

      this.server.respondWith('POST', this.todos.url, response);
      this.todos.fetch({ error: callback });
      this.server.respond();

      expect(callback.called).toBe(true);
    });
  });
});
