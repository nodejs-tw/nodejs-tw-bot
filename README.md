# nodejs-tw-bot


## how to start dev 

- Install ngrok
- Line Messaging API Channel
- Edit and mv `.env.example` to `.env`
- RUN `npm install` and `npm run start`


### how to get your `LINE_GROUP_ID` in .env file?

run this project and send `/give_me_id` to your bot.

### scheduling
#### auto close issue

setting ENV variables
- GITHUB_ACCESS_TOKEN=
- REPONAME=nodejs-tw/jobs
- CLOSEDAY=365

GITHUB_ACCESS_TOKEN setting
1. https://github.com/settings/tokens
2. Select scopes
3. repo ( Full control of private repositories )

REPONAME put repo name

CLOSEDAY mean 365 days ago will be closed