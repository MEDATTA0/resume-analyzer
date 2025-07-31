import ms, { StringValue } from "ms";
import jwt from "jsonwebtoken";

const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (userId: string) => {
  const expiration = ms(JWT_EXPIRATION as StringValue);
  const token = jwt.sign({ userId }, JWT_SECRET as string, {
    expiresIn: expiration,
  });
  return token;
};

export const decodeJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { complete: true });
    return decoded.payload;
  } catch (err) {
    // Todo: Manage errors
    console.log(err);
  }
};
