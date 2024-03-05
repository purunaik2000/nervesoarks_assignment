import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];

        if(!token) return res.status(401).send({
            status: false,
            message: "login first"
        });
        
        // Verify token.
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) return res.status(401).send({
                status: false,
                message: "login first"
            });

            // If everything is good, save to request for use in other routes.
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Server error"
        });
    }
}

export const authorisation = async (req, res, next) => {
    try {
        if(decoded.type != "Admin") return res.status(403).send({
            status: false,
            message: "Not Allowed"
        });

        next();
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Server error"
        });
    }
};