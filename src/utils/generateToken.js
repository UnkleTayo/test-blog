import jwt from 'jsonwebtoken'

const generateToken = (email,id) => {
    return jwt.sign({email, id}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
}

export default generateToken