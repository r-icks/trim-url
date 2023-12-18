import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../Errors/index.js";
import attachCookie from "../utils/attachCookie.js";
import db from "../db/connect.js";


const validatePassword = (password) => {
    return validator.isLength(password, { min: 8 }) && /[A-Z]/.test(password);
  };

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Please provide all values!");
    }
    if (!validatePassword(password)) {
      throw new BadRequestError(
        "Password must be at least 8 characters long and contain at least one uppercase letter."
      );
    }

    const userAlreadyExists = await db("users").where({ email }).first();

    if (userAlreadyExists) {
      throw new BadRequestError("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [test] = await db("users").insert({
      name,
      email,
      password: hashedPassword,
    },'userId');
    const {userId} = test;
    console.log(userId);

    const token = generateJWT({ userId });
    attachCookie({ token, res });

    res.status(StatusCodes.OK).json({ user: { name, email }});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide all values!");
    }

    const user = await db("users").where({ email }).first();

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = generateJWT({ userId: user.userId });
    attachCookie({ token, res });

    res.status(StatusCodes.OK).json({ user: { name: user.name, email }});
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

const getCurrentUser = async (req, res) => {
    const user = await db("users").where({ userId: req.user.userId }).first();
    if(!user){
        throw new UnauthenticatedError("User doesnot exist");
    }
    res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email } });
};

const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export { register, login, getCurrentUser, logout };