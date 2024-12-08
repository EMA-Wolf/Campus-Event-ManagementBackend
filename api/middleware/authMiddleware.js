const jwk = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    
    if(!token) return res.status(401).json({error:"Unauthorized"})

    try{
        const decoded = jwk.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'admin') {
            return res.status(403).json({error: "Forbidden: Admins only"})
        }
        req.user = decoded
        next()
    }catch(err){
        res.status(403).json({error:"Invalid token"})
    }
 
}

const userAuthenticate = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({error:"Unauthorized"})

    try{
        const decoded = jwk.verify(token, process.env.JWT_SECRET)
      if(decoded.role !== 'user'){
        return res.status(403).json({error:"Forbidden: Users only"})
      }
        req.user = decoded
        next()
    }catch(err){
        res.status(403).json({error:"Invalid token"})
    }
}
module.exports = {authenticate, userAuthenticate}