describe("AsyncTest in Jasmine", function () {
  it('should test async 1', function () {
    var foo = 0;

    runs(function () {
      setTimeout(function () { foo++; }, 250);
    });

    waits(300);

    runs(function () {
      expect(foo).toEqual(1);
    });
  });

  it('should test async 2', function () {
    var done1, done2, foo = 0;

    runs(function () {
      setTimeout(function () {
        foo++;
        done1 = true;
      }, 250);
    });

    runs(function () {
      setTimeout(function () {
        foo++;
        done2 = true;
      }, 500);
    });

    waitsFor(function () {
      return done1 && done2;
    });

    runs(function () { expect(foo).toEqual(2); });
  });
});
