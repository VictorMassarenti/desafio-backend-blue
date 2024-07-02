import { Appointment } from "@prisma/client";
import { prisma } from "../config/prisma";

class AppointmentModel {
  async create({ date, userId }: Pick<Appointment, "date" | "userId">) {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          date,
          userId,
          status: true,
        },
      });
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async findByUserIdAndId({ id, userId }: Pick<Appointment, "id" | "userId">) {
    try {
      const appointment = await prisma.appointment.findFirst({
        where: {
          id,
          userId,
        },
      });
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async update({
    id,
    userId,
    date,
  }: Pick<Appointment, "id" | "userId" | "date">) {
    try {
      const appointment = await prisma.appointment.update({
        where: {
          id,
          userId,
        },
        data: {
          date,
        },
      });
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async cancel({ id, userId }: Pick<Appointment, "id" | "userId">) {
    try {
      const appointment = await prisma.appointment.update({
        where: {
          id,
          userId,
        },
        data: {
          status: false,
        },
      });
      return appointment;
    } catch (error) {
      throw error;
    }
  }
}

export const appointmentModel = new AppointmentModel();
