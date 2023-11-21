import { jwtVerify } from "jose";

export const verifyJwtToken = async (token) => {
  try {
    const payload = await jwtVerify(token, new TextEncoder().encode("linkshareappsecret"));
    return payload;
  } catch (error) {
    return null;
  }
};
