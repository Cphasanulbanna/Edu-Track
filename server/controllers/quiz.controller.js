import mongoose from "mongoose";
import Quiz from "../models/quiz.model.js";
import QuizQuestions from "../models/quizQuestion.model.js";
import QuizStudentResponse from "../models/quizStudentResponse.model.js";

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
    const quizzes = await Quiz.find({}).populate("questions");
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
      question: newQuestion,
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

export const submitQuiz = async (req, res) => {
  const { quizId, studentId } = req.query;
  const response = req.body;
  try {
    if (!quizId || !studentId) {
      return res
        .status(400)
        .json({ message: "Student and Quiz Id is required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(quizId) ||
      !mongoose.Types.ObjectId.isValid(studentId)
    ) {
      return res.status(400).json({ message: "Invalid Quiz or Student ID" });
    }
    if (!response?.length) {
      return res.status(400).json({ message: "Quiz answers are required" });
    }
    const existingAnswers = await QuizStudentResponse.findOne({
      quiz: quizId,
      student: studentId,
    });

    if (existingAnswers) {
      return res
        .status(400)
        .json({ message: "You have already submitted this quiz" });
    }

    const questionIds = response?.map((obj) => obj?.question);
    const quizQuestions = await QuizQuestions.find({
      _id: { $in: questionIds },
    });

    if (quizQuestions.length !== questionIds.length) {
      return res.status(400).json({ message: "Some questions do not exist" });
    }

    let score = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    for (const obj of response) {
      const quizObj = quizQuestions.find(
        (quiz) => quiz._id.toString() === obj.question
      );

      if (quizObj) {
        const correctOption = quizObj?.options?.find(
          (obj) => obj?.correct === true
        );
        if (String(obj?.selectedOption) === String(correctOption?._id)) {
          score += 1;
          totalCorrect += 1;
        } else {
          totalIncorrect += 1;
        }
      }
    }

    const newQuizResponse = new QuizStudentResponse({
      quiz: quizId,
      student: studentId,
      responses: response,
      score,
      totalCorrect,
      totalIncorrect,
    });

    await newQuizResponse.save();
    return res.status(201).json({
      message: "Quiz Submitted",
      score: newQuizResponse.score,
      totalCorrect,
      totalIncorrect,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchQuizResults = async (req, res) => {
  const { quizId, studentId } = req.query;
  try {
    if (!quizId || !studentId) {
      return res
        .status(400)
        .json({ message: "Student and Quiz Id is required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(quizId) ||
      !mongoose.Types.ObjectId.isValid(studentId)
    ) {
      return res.status(400).json({ message: "Invalid Quiz or Student ID" });
    }

    const quizResults = await QuizStudentResponse.findOne({
      quiz: quizId,
      student: studentId,
    })
      .populate({ path: "quiz", select: "name" })
      .select("-responses -createdAt -updatedAt -__v -student");
    if (!quizResults) {
      return res
        .status(404)
        .json({ message: "No quiz results found for this student." });
    }

    return res.status(200).json({ quizResults });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPastQuizzesOfStudent = async (req, res) => {
  const { studentId } = req.query;
  try {
    if (!studentId) {
      return res.status(400).json({ message: "Student Id is required" });
    }

    const quizzes = await QuizStudentResponse.find({ student: studentId })
      .populate({ path: "quiz", select: "name" })
      .select("-responses -createdAt -updatedAt -__v -student");
    if (!quizzes.length) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchSpecificQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    if (!quizId) {
      return res.status(400).json({ message: "Quiz Id is required" });
    }

    const quiz = await Quiz.findById(quizId)
      .populate({ path: "questions", select: "-createdAt -updatedAt -__v" })
      .select("-createdAt -updatedAt -__v");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(200).json({ quiz });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchPastQuizzesOfAllStudents = async (req, res) => {
  const { quizId } = req.query;
  try {
    const filter = {};

    if (quizId) {
      filter.quiz = quizId;
    }
    const quizzes = await QuizStudentResponse.find(filter)
      .populate({
        path: "student",
        select: "profile",
        populate: { path: "profile", select: "first_name last_name" },
      })
      .populate({ path: "quiz", select: "name" })
      .select("-createdAt -updatedAt -__v -responses");
    if (!quizzes.length) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
