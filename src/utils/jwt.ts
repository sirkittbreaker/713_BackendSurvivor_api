import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) for user authentication
 *
 * This function creates a signed JWT containing user information that can be used
 * for stateless authentication in the application. The token is signed using the
 * HS256 algorithm and includes an expiration time.
 *
 * @param user - User object containing data to be encoded in the token (typically user ID and role)
 * @returns A signed JWT string that can be sent to the client
 * @throws Error if JWT_SECRET environment variable is not defined
 */
export function jwtGenerate(user: any) {
  // Retrieve the secret key from environment variables
  // This secret should be kept secure and not exposed in the codebase
  const secret = process.env.JWT_SECRET as string;

  // Verify that the secret is available, otherwise authentication can't proceed safely
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Create and sign the JWT with the following options:
  // - user data as payload
  // - secret key for signing
  // - 1 hour expiration (security best practice to limit token lifetime)
  // - HS256 algorithm (HMAC with SHA-256, widely supported and secure)
  const accessToken = jwt.sign(user, secret, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  return accessToken;
}
