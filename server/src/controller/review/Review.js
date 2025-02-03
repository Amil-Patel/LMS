const { review, UserMaster } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const gettingReviewWithCourseId = async (req, res) => {
  const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
  if (!isAuthenticated) return;

  try {
    // Fetch all reviews for the given course_id
    const reviews = await review.findAll({
      where: { course_id: req.params.id },
    });

    // Extract unique student_ids from the reviews
    const studentIds = [...new Set(reviews.map((r) => r.student_id))];

    // Fetch details for those students
    const students = await UserMaster.findAll({
      where: { id: studentIds },
      attributes: ["id", "first_name", "last_name", "profile"],
      raw: true,
    });

    // Map reviews with student details
    const response = reviews.map((r) => ({
      ...r.toJSON(),
      student: students.find((s) => s.id === r.student_id) || null,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const gettingReviewWithStudentId = async (req, res) => {
  const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
  if (!isAuthenticated) return;

  try {
    const reviews = await review.findAll({
      where: { student_id: req.params.id },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addingReview = async (req, res) => {
  const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
  if (!isAuthenticated) return;
  try {
    const data = {
      student_id: req.body.student_id,
      course_id: req.body.course_id,
      review: req.body.review,
      rating: req.body.rating,
      createdAt: DateToUnixNumber(new Date(), "America/Toronto"),
      updatedAt: DateToUnixNumber(new Date(), "America/Toronto"),
    };
    const response = await review.create(data);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const updatingReview = async (req, res) => {
  const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
  if (!isAuthenticated) return;
  try {
    const data = {
      student_id: req.body.student_id,
      course_id: req.body.course_id,
      review: req.body.review,
      rating: req.body.rating,
      updatedAt: DateToUnixNumber(new Date(), "America/Toronto"),
    };
    const response = await review.update(data, {
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  gettingReviewWithCourseId,
  gettingReviewWithStudentId,
  addingReview,
  updatingReview,
};
