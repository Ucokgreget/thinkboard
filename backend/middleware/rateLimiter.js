const rateLimit = require('../config/upstash')

const rateLimiter = async(req, res, next) =>{
    try {
        const {success} = await rateLimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({message:"Too many request"})
        }

        next()
    } catch (error) {
        console.log("rate limit error", error);
        next(error)
    }
    
} 


module.exports = rateLimiter