"use server";

import { collctions, connect } from "@/lib/connect";
import bcrypt from "bcryptjs";

export const postUser = async (paylod) => {
  const { email, fullName, password } = paylod;

  //chack user
  if (!email || !password) {
    return null;
  }

  // User exist or not
  const isExist = await connect(collctions.USERS).findOne({ email });
  if (isExist) {
    return null;
  }

  // create new user
  const newUser = {
    email,
    name: fullName,
    password: await bcrypt.hash(password, 12),
    provider: "Credentials",
    createAt: new Date(),
    role: "user",
  };

  //insert user
  const result = await connect(collctions.USERS).insertOne(newUser);
  return {
    ...result,
    insertedId: result.insertedId.toString(),
  };
};
export const loginUser = async (paylod) => {
  const { email, password } = paylod;

  //chack user
  if (!email || !password) return null;

  const user = await connect(collctions.USERS).findOne({ email });

  if (!user) return null;

  const isMatchd = await bcrypt.compare(password, user.password);
  if (isMatchd) {
    return user;
  } else {
    return null;
  }
};
