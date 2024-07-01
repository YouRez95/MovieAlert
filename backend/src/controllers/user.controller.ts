import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  // Get the user info
  const user = await UserModel.findById(req.userId);

  appAssert(user, NOT_FOUND, 'User Not Found');
  return res.status(OK).json(user.omitPassword());
})