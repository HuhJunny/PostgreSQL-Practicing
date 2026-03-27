import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export async function registerService(data) {
  const hashed = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
    },
  });
}

export async function loginService(data) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new Error("유저 없음");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("비밀번호 틀림");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}