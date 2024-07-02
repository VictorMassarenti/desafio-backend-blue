import { validateBody } from "../utils/validateBody";
import { AppointmentSchema } from "../utils/zodSchema";

class AppointmentValidation {
  create = validateBody(
    AppointmentSchema.omit({ id: true, status: true, userId: true }).strict()
  );

  update = validateBody(
    AppointmentSchema.omit({ id: true, status: true, userId: true })
      .partial()
      .strict()
  );
}

export const appointmentValidation = new AppointmentValidation();
