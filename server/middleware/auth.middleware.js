import jwt from "jsonwebtoken";

export const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.decode(token);
      req.user = {
        id: decoded.sub,
        roles: decoded.roles,
      };

      const hasAccess = req.user.roles?.some((role) =>
        allowedRoles?.includes(role)
      );

      if (!hasAccess) {
        return res.status(403).json({ message: "Access denied" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
