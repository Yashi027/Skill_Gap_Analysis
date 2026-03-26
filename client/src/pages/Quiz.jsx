import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Quiz = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { setSkillRatings } = useContext(AppContext);
    const { skill, rating } = state;
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const quizQuestions = {
        HTML: [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlinks and Text Markup Language",
                    "Home Tool Markup Language"
                ],
                answer: "Hyper Text Markup Language"
            },
            {
                question: "Which tag is used to create a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<url>"],
                answer: "<a>"
            },
            {
                question: "Which tag is used to insert an image?",
                options: ["<image>", "<img>", "<src>", "<picture>"],
                answer: "<img>"
            },
            {
                question: "Which element is used for the largest heading?",
                options: ["<h6>", "<heading>", "<h1>", "<head>"],
                answer: "<h1>"
            },
            {
                question: "Which attribute is used to provide alternative text for an image?",
                options: ["title", "alt", "src", "href"],
                answer: "alt"
            }
        ],

        CSS: [
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                answer: "Cascading Style Sheets"
            },
            {
                question: "Which property is used to change text color?",
                options: ["font-color", "text-color", "color", "background-color"],
                answer: "color"
            },
            {
                question: "Which CSS property controls the text size?",
                options: ["font-style", "text-size", "font-size", "text-style"],
                answer: "font-size"
            },
            {
                question: "How do you select an element with id 'demo'?",
                options: ["#demo", ".demo", "demo", "*demo"],
                answer: "#demo"
            },
            {
                question: "Which property is used to create space inside an element?",
                options: ["margin", "padding", "border-spacing", "spacing"],
                answer: "padding"
            }
        ],

        MongoDB: [
            {
                question: "MongoDB is a?",
                options: [
                    "Relational Database",
                    "NoSQL Database",
                    "Programming Language",
                    "Frontend Framework"
                ],
                answer: "NoSQL Database"
            },
            {
                question: "MongoDB stores data in?",
                options: [
                    "Tables",
                    "Rows",
                    "Documents",
                    "Spreadsheets"
                ],
                answer: "Documents"
            },
            {
                question: "Which command is used to insert a document?",
                options: [
                    "insertOne()",
                    "add()",
                    "create()",
                    "push()"
                ],
                answer: "insertOne()"
            },
            {
                question: "Which field is automatically created in every MongoDB document?",
                options: [
                    "_key",
                    "id",
                    "_id",
                    "primary"
                ],
                answer: "_id"
            },
            {
                question: "Which method is used to fetch data?",
                options: [
                    "get()",
                    "fetch()",
                    "find()",
                    "select()"
                ],
                answer: "find()"
            }
        ],
        React: [
            {
                question: "Which hook is used for state management?",
                options: ["useEffect", "useState", "useRef", "useReducer"],
                answer: "useState"
            },
            {
                question: "Which hook runs side effects?",
                options: ["useEffect", "useState", "useRef", "useReducer"],
                answer: "useEffect"
            },
            {
                question: "What is JSX?",
                options: [
                    "A Database",
                    "A framework",
                    "A JavaScript extension for UI",
                    "A backend language"
                ],
                answer: "A JavaScript extension for UI"
            },
            {
                question: "React is mainly used for?",
                options: [
                    "Database management",
                    "Building user interfaces",
                    "Server configuration",
                    "Machine learning"
                ],
                answer: "Building user interfaces"
            },
            {
                question: "Props are used to?",
                options: [
                    "Store state",
                    "Pass data between components",
                    "Fetch API",
                    "Style components"
                ],
                answer: "Pass data between components"
            }
        ],
        JavaScript: [
            {
                question: "Which Data Type is not primitive?",
                options: ["Sttring", "Number", "Object"],
                answer: "Object"
            },
            {
                question: "Which keyword declares a block-scoped variable?",
                options: ["var", "let", "function", "const"],
                answer: "let"
            },
            {
                question: "Which method converts JSON to object?",
                options: [
                    "JSON.stringify()",
                    "JSON.parse()",
                    "JSON.convert()",
                    "JSON.toObject()"
                ],
                answer: "JSON.parse()"
            },
            {
                question: "Which symbol is used for strict equality?",
                options: ["==", "=", "===", "!="],
                answer: "==="
            },
            {
                question: "Which array method adds element at end?",
                options: ["push()", "pop()", "shift()", "map()"],
                answer: "push()"
            }
        ],
        NodeJs: [
            {
                question: "Node.js is built on which JavaScript engine?",
                options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
                answer: "V8"
            },
            {
                question: "Which module is used to create a server in Node.js?",
                options: ["http", "server", "fs", "url"],
                answer: "http"
            },
            {
                question: "Which of the following is asynchronous in Node.js?",
                options: [
                    "fs.readFile()",
                    "fs.readFileSync()",
                    "require()",
                    "console.log()"
                ],
                answer: "fs.readFile()"
            },
            {
                question: "What does npm stand for?",
                options: [
                    "Node Project Manager",
                    "New Package Manager",
                    "Node Package Manager",
                    "Node Programming Method"
                ],
                answer: "Node Package Manager"
            },
            {
                question: "Which keyword is used to export a module?",
                options: [
                    "export",
                    "module.exports",
                    "require",
                    "include"
                ],
                answer: "module.exports"
            }
        ],

        Redux: [
            {
                question: "Redux is mainly used for?",
                options: [
                    "Styling components",
                    "Routing",
                    "State management",
                    "Database handling"
                ],
                answer: "State management"
            },
            {
                question: "Redux follows which pattern?",
                options: [
                    "MVC",
                    "Observer",
                    "Flux",
                    "Singleton"
                ],
                answer: "Flux"
            },
            {
                question: "What is used to send data to the Redux store?",
                options: [
                    "Reducer",
                    "Dispatch",
                    "Selector",
                    "Middleware"
                ],
                answer: "Dispatch"
            },
            {
                question: "Reducers must be?",
                options: [
                    "Asynchronous",
                    "Pure functions",
                    "Class components",
                    "Mutable"
                ],
                answer: "Pure functions"
            },
            {
                question: "Which hook is used to access Redux state in React?",
                options: [
                    "useStore",
                    "useDispatch",
                    "useSelector",
                    "useReducer"
                ],
                answer: "useSelector"
            }
        ]
    };

    const questions = quizQuestions[skill] || [];

    const handleSubmit = () => {
        let correctcount = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.answer) {
                correctcount++;
            }
        });
        if (correctcount === questions.length) {
            setSkillRatings(prev => ({
                ...prev,
                [skill]: rating
            }));
            alert("Congratulations! Full Marks. Rating Updated.");
            navigate('/analysis');
        } else {
            alert(`You scored ${correctcount}/${questions.length}. Full Marks are required.`)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex flex-col items-center justify-center py-12 px-6'>
            <h1 className='text-3xl font-bold text-center text-indigo-700 mb-6'>
                {skill} Skill Test
            </h1>
            <div className='space-y-8'>
                {questions.map((q, index) => (
                    <div key={index} className='p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm'>
                        <h2 className='font-semibold text-lg text-gray-800 mb-4'>{index+1}. {q.question}</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setSelectedAnswers(prev => ({
                                        ...prev,
                                        [index]: opt
                                    }));
                                }}
                                className={`block mt-2 px-4 py-2 border rounded-lg transition-all ${selectedAnswers[index] === opt ?
                                    "bg-indigo-600 text-white border-indigo-600" :
                                    "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                                    }`}>
                                {opt}
                            </button>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className='bg-indigo-600 text-white px-10 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-300 mt-8'>
                Submit Quiz
            </button>
        </div>
    )
}

export default Quiz