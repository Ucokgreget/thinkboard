const notFound = (req, res) =>{
    return res.status(404).json({msg:"404 route does not exist"})
}

module.exports = notFound