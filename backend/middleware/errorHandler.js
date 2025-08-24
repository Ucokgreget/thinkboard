const { customAPIError } = require('../error/custom-error')

const errorHandlerMiddleware =(err, req, res, next) =>{
    if(err instanceof customAPIError){
        return res.status(err.statusCode).json(err.message)
    }
    return res.status(500).json({msg:"500 something went wrong"})
}

module.exports = errorHandlerMiddleware