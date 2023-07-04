import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ msg: "Access Denied" });
    }
    //   if (token.startWith("Bearer ")) {
    //     token = token.slice(7, token.length).trimLeft();
    //   }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
