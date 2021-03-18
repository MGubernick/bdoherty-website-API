const User = require('../app/models/user')

const bcrypt = require('bcrypt')

const seedUser = function () {
  User.deleteOne({ email: 'bdoherty@bdoh.com' })
    .then(() => bcrypt.hash('mb041918', 10))
    .then((hash) => User.create([{ email: 'bdoherty@bdoh.com', username: 'Bridget', hashedPassword: hash, admin: true }]))
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

seedUser()
