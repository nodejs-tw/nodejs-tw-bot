const _ = require('lodash');
const fbgraph = require('fbgraph');

const group_id = process.env.FACEBOOK_GROUP_ID;

let access_token = process.env.FACEBOOK_USER_TOKEN;

fbgraph.setAccessToken(access_token);

fbgraph.extendAccessToken({
    'client_id': process.env.FACEBOOK_APP_ID,
    'client_secret': process.env.FACEBOOK_APP_SECRET,
    'access_token': access_token
  }, function (err, facebookRes) {
    // if (err) return cb(err);
    console.log('facebookRes', err, facebookRes);
    access_token = facebookRes && facebookRes.access_token || access_token;

    fbgraph.get('debug_token?input_token=' + access_token, function(err, res) {
        console.log(res);
        console.log(new Date(res.data.expires_at * 1000))
    });

    fbgraph.get('/me/accounts', function(err, res) {
        console.log(res.data);
        let organization = _.find(res.data, { name: 'NodeJS Taiwan' })
        console.log('organization', organization);

        fbgraph.setAccessToken(organization.access_token);
        
        // let feed_data = {
        //     message: `xxx 發佈了一個新 issue: \n\n oooo \n-----------\n zzzzzzz`,
        //     link: 'http://google.com'
        // };
        // fbgraph.post(`/${group_id}/feed`, feed_data, (err, res) => {
        //     console.log('feed', res);            
        // })
    });
  });

module.exports = {
    pushFeed: (issue_data) => {
        let feed_data = {
            message: `${issue_data.username} 發佈了一個新 issue: \n\n ${issue_data.title} \n-----------\n ${issue_data.desc}`,
            link: issue_data.url
        };
        fbgraph.post(`/${group_id}/feed`, feed_data, (err, res) => {
            console.log('feed', res);            
        })
    }
}

