const faker = require('faker');

const db = require('../config/connection');
const { User, Event } = require('../models');



db.once('open', async () => {
    await Event.deleteMany({});
    await User.deleteMany({});


  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();


    userData.push({ username, email, password });
  }

  const createdUsers = await User.insertMany(userData);


  console.log('all done!');
  process.exit(0);

});