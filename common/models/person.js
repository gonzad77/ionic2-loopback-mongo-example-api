'use strict';

var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Person) {

  Person.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: user.email,
      from: 'gonza.digiovanni@gmail.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify-email.ejs'),
      redirect: 'http://localhost:5000/login',
      user: user,
    };

    user.verify(options, function(err, response) {
      if (err) {
        Person.deleteById(user.id);
        return next(err);
      }

      console.log('> verification email sent:', response);

    });
  });
};
