import Holiday from "../models/holiday.model.js";
import { convertToDateOnly } from "../utils/date.js";

export const addHolidays = async (req, res) => {
  const { date, description } = req.body;
  try {
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    const formattedDate = convertToDateOnly(date);
    const existingHoliday = await Holiday.findOne({ date: formattedDate });

    if (existingHoliday) {
      return res.status(400).json({ message: "Holiday already exists" });
    }

    const newHoliday = new Holiday({ date: formattedDate, description });
    await newHoliday.save();
    return res
      .status(201)
      .json({ message: "Holiday added successfully", holiday: newHoliday });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({});

    if (holidays.length) {
      return res.status(404).json({ message: "Holidays not found" });
    }

    res.status(500).json({ holidays });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
