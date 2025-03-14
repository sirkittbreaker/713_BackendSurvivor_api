/**
 * JWT Authentication middleware
 * Verifies token from Authorization header
 */
import jwt from "jsonwebtoken";

/**
 * Validates JWT token in request header
 * On success: attaches decoded user to req.user
 * On failure: returns 401 Unauthorized
 */
export function jwtVerify(req: any, res: any, next: any) {
  try {
    // Check for Authorization header
    if (!req.headers.authorization) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Extract token without Bearer prefix
    const token = req.headers.authorization.replace("Bearer ", "");

    // Verify token signature and expiration
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }
        // Attach user data to request
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("❌", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  } finally {
    // Log verification result
    console.log(`✅ JWT verification completed, status=${res.statusCode}`);
  }
}
