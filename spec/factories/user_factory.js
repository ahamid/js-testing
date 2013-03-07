Factory.define('user')
  .sequence('id')
  .attr('firstname', function () { return Faker.Name.firstName(); })
  .attr('lastname', function () { return Faker.Name.lastName(); })
  .attr('email', function () { return Faker.Internet.email(); })
  .attr('password', function () { return "secret"; });
