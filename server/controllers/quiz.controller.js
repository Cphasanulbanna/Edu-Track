import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "quiz name is required" });
    }
    const quiz = await Quiz.findOne({ name });
    if (quiz) {
      return res
        .status(400)
        .json({ message: "quiz already exists with this name" });
    }
    const newQuiz = new Quiz({
      name,
      description,
    });
    await newQuiz.save();

    return res.status(201).json({ message: "New quiz created", quiz: newQuiz });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    if (!quizzes.length) {
      return res.status(400).json({ message: "No quizzes found" });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
