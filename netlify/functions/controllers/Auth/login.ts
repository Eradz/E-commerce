import { Response, Request } from "express";
import AsyncHandler from "express-async-handler";
import { User } from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppResponse, setCookies } from "../../common/utils";

export const loginController = AsyncHandler(async (req: Request, res: Response) => {
  const { password, email } = req.body;

  // Validate input early
  if (!email || !password) {
    return AppResponse.error(res, "Email and password are required");
  }

  // Select only necessary fields to reduce data transfer
  const user = await User.findOne({ 
    where: { email },
    attributes: ['id', 'firstname', 'password', 'googleId']
  });

  if (!user) {
    return AppResponse.error(res, "Invalid email or password");
  }

  if (user.googleId || !user.password) {
    return AppResponse.error(res, "Please sign in with Google");
  }

  // Verify password
  if ((await bcrypt.compare(password, user.password))) {
    return AppResponse.error(res, "Invalid email or password");
  }

  // Generate JWT
  const accessToken = jwt.sign(
    { userId: user.id},
    process.env.JWT_SECRET || "",
    { expiresIn: "7d" }
  );

  // Set cookie and send response
  setCookies(res, "access_token", accessToken);
  return AppResponse.success(res, `Welcome ${user.firstname}`, null);
});