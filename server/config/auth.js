module.exports = {
  'facebookAuth' : {
      'clientID'      : process.env.FACEBOOK_CLIENT_ID, // your App ID
      'clientSecret'  : process.env.FACEBOOK_CLIENT_SECRET, // your App Secret
      'callbackURL'   : process.env.WEBSITE_URL + '/auth/facebook/callback'
  },
}
