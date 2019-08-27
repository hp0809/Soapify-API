const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      email: 'tu1@gmail.com',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      email: 'tu2@gmail.com',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      email: 'tu3@gmail.com',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      email: 'tu4@gmail.com',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeSoapsArray(users) {
  return [
    {
      id: 1,
      name: 'soap 1',
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      name: 'soap 2',
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      name: 'soap 3',
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      name: 'soap 4',
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeExpectedSoap(users, soap) {
  const user = users
    .find(user => user.id === soap.user_id)

  return {
    id: soap.id,
    name: soap.title,
    text: soap.text,
    date_created: article.date_created.toISOString(),
    user: {
      id: author.id,
      user_name: user.user_name,
      email: user.email,
      nickname: user.nickname,
    },
  }
}

function makeMaliciousSoap(user) {
  const maliciousSoap = {
    id: 911,
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    text: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedSoap = {
    ...makeExpectedSoap([user], maliciousSoap),
    name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    text: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousSoap,
    expectedSoap,
  }
}

function makeSoapFixtures() {
  const testUsers = makeUsersArray()
  const testSoaps = makeSoapsArray(testUsers)
  return { testUsers, testSoaps}
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        soapify_users,
        user_soaps
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE user_soaps_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE soapify_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('user_soaps_id_seq', 0)`),
        trx.raw(`SELECT setval('soapify_users_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('soapify_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('soapify_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedSoapTables(db, users, soaps) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('user_soaps').insert(soaps)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('user_soaps_id_seq', ?)`,
      [soaps[soaps.length - 1].id],
    )
  })
}

function seedMaliciousSoap(db, user, soap) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('user_soaps')
        .insert([soap])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeSoapsArray,
  makeMaliciousSoap,

  makeSoapFixtures,
  cleanTables,
  seedSoapTables,
  seedMaliciousSoap,
  makeAuthHeader,
  seedUsers,
}