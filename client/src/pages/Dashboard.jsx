import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  const { roadmap, completedSkills, skillRatings, selectedCareer, progress } = useContext(AppContext);
  const masteredCount = roadmap.filter((s) => skillRatings[s.name] >= 4).length;
  const totalSkills = roadmap.length;

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-4xl mx-auto space-y-6'>

        <div className='bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6'>

          <div className='text-center md:text-left'>
            <h1 className='text-3xl font-black text-slate-800 uppercase tracking-tight'>
              {selectedCareer || "Developer"}
              <span className='text-indigo-400'> Path</span>
            </h1>
            <p className='text-slate-500 mt-1 font-medium'>Tracking your Transition to Industry Ready.</p>
          </div>

          <div className='relative flex items-center justify-center'>
            <div
              className='h-24 w-24 rounded-full flex items-center justify-center'
              style={{
                background: `conic-gradient(
              #6366f1 ${progress * 3.6}deg, 
              #e2e8f0 ${progress * 3.6}deg)`,
                padding: "10px"
              }}
            >
              <div className='h-full w-full bg-white rounded-full flex items-center justify-center'>
                <span className='text-xl font-bold text-slate-700'>{progress}%</span>
              </div>
              <div className='absolute -bottom-2 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-lg'>
                Level: {progress > 80 ? 'Expert' : progress > 40 ? 'Intermediate' : 'Beginner'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard