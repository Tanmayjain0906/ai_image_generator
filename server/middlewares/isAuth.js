const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.send({
            success: false,
            status: 401,
            message: "Token Not Provided",
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.send({
                success: false,
                status: 401,
                message: "Session Expired Please Login Again",
            })

        }
         req.user = { id: tokenDecode.id };
        next();
    } catch (error) {
        return res.send({
            success: false,
            status: 401,
            message: "Session Expired Please Login Again",
            error: error,
        })
    }
}

module.exports = isAuth;