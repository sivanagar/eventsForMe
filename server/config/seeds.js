const db = require('./connection');
const { User, Event} = require('../models');

db.once('open', async () => {

await User.deleteMany();
await Event.deleteMany();

await User.create({
  username : 'pamela',
  email: 'pamela@testmail.com',
  password: 'password12345',
});
await User.create({
  username : 'joe',
  email: 'joe@joe.com',
  password: 'password12345',
});
console.log('users seeded');

await Event.create({
  title : 'Fun Event',
  address: '1234 Fake St, Santa Monica, CA, 95403',
  description: 'fun event description',
  owner: 'joe',
  capacity: '10',
  when: '08-01-22',

});
console.log('Event seeded');

console.log('END script seeding');

process.exit();
});
