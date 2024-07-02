import { Request, Response } from "express";
import { Appointment, User } from "../utils/zodSchema";
import { appointmentModel } from "../models/appointmentModel";
import { sendErrorResponse } from "../utils/errorFunction";
import { generatePdf } from "../utils/generatePdf";

class AppointmentController {
  async create(req: Request, res: Response) {
    const userId: string = req.user;
    const { date }: Pick<Appointment, "date"> = req.body;

    try {
      const appointment: Appointment | undefined =
        await appointmentModel.create({
          date,
          userId,
        });

      const fileName = `appointment_${appointment?.id}.pdf`;
      // O Arquivo será gerado na pasta raiz do projeto podendo futuramente ser feito upload para um bucket
      generatePdf({ fileName, date, userId, status: appointment.status });

      return res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }

  async read(req: Request, res: Response) {
    const userId: string = req.user;
    const { id } = req.params;

    try {
      const appointment: Appointment | null =
        await appointmentModel.findByUserIdAndId({
          id,
          userId,
        });

      if (!appointment) {
        return sendErrorResponse(res, 400, "Appointment not found");
      }

      return res.status(200).json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }

  async update(req: Request, res: Response) {
    const userId: string = req.user;
    const { id } = req.params;
    const { date }: Pick<Appointment, "date"> = req.body;

    try {
      const appointment: Appointment | null =
        await appointmentModel.findByUserIdAndId({
          id,
          userId,
        });

      if (!appointment) {
        return sendErrorResponse(res, 400, "Appointment not found");
      }

      const updatedAppointment: Appointment | null =
        await appointmentModel.update({
          id,
          userId,
          date,
        });

      return res.status(200).json(updatedAppointment);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }

  async cancel(req: Request, res: Response) {
    const userId: string = req.user;
    const { id } = req.params;

    try {
      const appointment: Appointment | null =
        await appointmentModel.findByUserIdAndId({
          id,
          userId,
        });

      if (!appointment) {
        return sendErrorResponse(res, 400, "Appointment not found");
      }

      const canceledAppointment: Appointment | null =
        await appointmentModel.cancel({
          id,
          userId,
        });

      return res.status(200).json(canceledAppointment);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, error.message);
      } else {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
      }
    }
  }
}

export const appointmentController = new AppointmentController();
