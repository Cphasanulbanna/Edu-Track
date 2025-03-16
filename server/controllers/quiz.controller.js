import Quiz from "../models/quiz.model.js";
import QuizQuestions from "../models/quizzQuestion.model.js";

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
    const quizzes = await Quiz.find({}).populate("questions")
    if (!quizzes.length) {
      return res.status(400).json({ message: "No quizzes found" });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addQuestionAndOptions = async (req, res) => {
  const { newQuestion, options } = req.body;
  const { quizId } = req.params;
  try {
    if (!newQuestion || !options) {
      return res
        .status(400)
        .json({ message: "Question and options are required" });
    }
    const question = await QuizQuestions.findOne({
      question: newQuestion
    });

    if (question) {
      return res.status(400).json({ message: "Question already added" });
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questionWithOptions = new QuizQuestions({
      question: newQuestion,
      options: options,
      quiz: quizId,
    });
    await questionWithOptions.save();
    quiz.questions.push(questionWithOptions._id);
    await quiz.save();

    return res.status(201).json({ message: "New questions and options added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
