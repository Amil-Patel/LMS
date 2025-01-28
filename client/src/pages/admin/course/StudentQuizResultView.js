import React, { useEffect, useState } from 'react';
import Hoc from "../layout/Hoc";
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const port = process.env.REACT_APP_URL;

const StudentQuizResultView = () => {
    const { id, studentId } = useParams();
    const [quizResult, setQuizResult] = useState(null);

    // Fetch quiz result data
    const getQuizResultDataWithQuizId = async () => {
        try {
            const res = await axiosInstance.get(`${port}/gettingQuizResultDataForViewWithquizId/${id}/${studentId}`);
            const { quizQuestions, quizResult } = res.data; // Destructure the response to get both arrays

            // Parse the JSON strings for user_answers and correct_answers
            const parsedUserAnswers = JSON.parse(quizResult[0].user_answers);
            const parsedCorrectAnswers = JSON.parse(quizResult[0].correct_answers);

            // Format the questions with the parsed data
            const formattedQuestions = quizQuestions.map(question => {
                const userAnswerIndex = parsedUserAnswers[question.id];  // Get the index of the user's answer
                const correctAnswerIndex = parsedCorrectAnswers[question.id];  // Get the index of the correct answer

                return {
                    ...question,
                    options: JSON.parse(question.options), // Parse the options string to an array
                    userAnswerIndex, // Store the index of the user's answer
                    correctAnswerIndex // Store the index of the correct answer
                };
            });

            setQuizResult({ quizResult, quizQuestions: formattedQuestions }); // Update state with parsed data
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    useEffect(() => {
        getQuizResultDataWithQuizId();
    }, [id, studentId]);

    return (
        <>
            <Hoc />
            <div className="main p-4 bg-gray-100 min-h-screen">
                <div className="main-top-bar mb-4">
                    <div id="user-tag">
                        <h5 className="text-2xl font-bold text-gray-800">Student Quiz Result View</h5>
                    </div>
                </div>

                {/* Display quiz results */}
                {quizResult ? (
                    <div className="space-y-6">
                        {quizResult.quizQuestions.map((question, index) => {
                            const { userAnswerIndex, correctAnswerIndex, options } = question;

                            return (
                                <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
                                    <h2 className="text-md font-semibold text-gray-700" dangerouslySetInnerHTML={{ __html: question.title }} />

                                    {/* Display options */}
                                    <div className="mt-2 space-y-2">
                                        {options.map((option, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-2 p-2 rounded-md bg-gray-100`}
                                                >
                                                    <span className="text-sm font-medium">{option}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Display user's answer and correct answer */}
                                    {userAnswerIndex != correctAnswerIndex && (
                                        <div className="mt-2">
                                            {/* Show user’s wrong answer in red */}
                                            <p className={`text-sm font-medium text-red-600`}>
                                                Your Answer: {options[userAnswerIndex]} <span className="text-red-600 font-bold">✘</span>
                                            </p>
                                            {/* Show correct answer in green */}
                                            <p className="text-sm text-gray-700 mt-2">
                                                Correct Answer:{" "}
                                                <span className="text-green-600 font-bold">{options[correctAnswerIndex]}</span>
                                            </p>
                                        </div>
                                    )}
                                    {userAnswerIndex == correctAnswerIndex && (
                                        <div className="mt-2">
                                            {/* Show user’s correct answer in green */}
                                            <p className={`text-sm font-medium text-green-600`}>
                                                Your Answer: {options[userAnswerIndex]} (Correct)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Loading quiz results...</p>
                )}
            </div>
        </>
    );
};

export default StudentQuizResultView;
