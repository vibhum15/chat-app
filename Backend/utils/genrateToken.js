import jwt from 'jsonwebtoken'

const genrateTokenAndSetCookies =(userID,res)=>{
    const token = jwt.sign({userID},process.env.ENV_SECRET,{
      expiresIn:'15d'
    })

    res.cookie("jwt",token,{
      maxAge:15*24*3600*1000,
      httpOnly:true,
      sameSite:"strict",
      secure: (process.env.ENV_SECURE !== "development")
    })
    // console.log(process.env.ENV_SECURE);
}

export default genrateTokenAndSetCookies;