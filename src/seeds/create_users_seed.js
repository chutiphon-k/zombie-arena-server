exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'user1', firstname: 'ชุติพนธ์', lastname: 'คงสมพรต', nickname: 'เจมส์'}),
        knex('users').insert({id: 2, username: 'user2', firstname: 'สมชาย', lastname: 'นะครับ', nickname: 'ชาย'}),
        knex('users').insert({id: 3, username: 'user3', firstname: 'สมหญิง', lastname: 'นะค่ะ', nickname: 'หญิง'})
      ]);
    });
};