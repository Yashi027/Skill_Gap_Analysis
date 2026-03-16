import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Progress = () => {
  const {completedSkills, roadmap, progress, streak} = useContext(AppContext);
  const totalskills = roadmap.length;
  const completed = completedSkills.length;
  const pending = totalskills-completed;

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Progress Tracker</h1>

        <div className='grid md:grid-cols-3 gap-6 mb-10'>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Overall Roadmap Completion</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              {progress}%
            </h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Learning Streak</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              {streak} days
            </h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Github Activity Score</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              75%
            </h2>
            <p className='text-sm text-gray-400'>Based on commits and repositories</p>
          </div>

        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-semibold mb-4'>GitHub Summary</h2>
          <ul>
            <li>Repositories Analyzed: 18</li>
            <li>Languages Used: 6</li>
            <li>Commits this week: 9</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Progress