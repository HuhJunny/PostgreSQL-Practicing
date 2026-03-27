import { registerService, loginService } from "../services/usersService.js";

export async function register(req, res, next) {
  try {
    const user = await registerService(req.validatedBody);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const token = await loginService(req.validatedBody);

    res.json({
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
}