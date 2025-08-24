const {Ratelimit} = require('@upstash/ratelimit')
const {Redis} = require('@upstash/redis')
require('dotenv').config()


const rateLimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100, "20 s")
})

module.exports = rateLimit