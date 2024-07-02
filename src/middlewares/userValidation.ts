import { validateBody } from "../utils/validateBody";
import { UserSchema } from "../utils/zodSchema";

class UserValidation {
  register = validateBody(
    UserSchema.omit({ id: true, appointments: true }).strict()
  );

  login = validateBody(
    UserSchema.omit({ id: true, appointments: true }).strict()
  );
}

export const userValidation = new UserValidation();
