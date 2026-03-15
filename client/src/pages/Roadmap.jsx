import React, { useContext,useState } from 'react'
import { AppContext } from '../context/AppContext'

const Roadmap = () => {

  const {roadmap,progress,streak,completedSkills,selectedCareer, completeSkill} = useContext(AppContext);
  const [filter,setFilter] = useState("all")

  const filteredSkills = roadmap.filter((skill) => {
    if(filter==="completed"){
      return completedSkills.includes(skill.name);
    }
    if(filter==="pending"){
      return !completedSkills.includes(skill.name);
    }
    return true;
  })

  return (
    <div className='min-h-screen px-6 py-8 bg-gray-50'>
      <div className='max-w-5xl mx-auto'>
        
        <div className='bg-indigo-500 text-white p-6 rounded-xl shadow mb-8'>
          <h1 className='text-2xl font-semibold capitalize'>
            {selectedCareer ? `${selectedCareer} Roadmap`: 'Learning Roadmap'}
          </h1>
          <p className='text-sm opacity-90 mt-1'> Follow this roadmap to become a Skilled {selectedCareer ? `${selectedCareer}`: 'Developer'}</p>
          <p className='mt-3 text-sm'>🔥Learning Streak: <span className='font-semibold'>{streak}</span> days</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
           <div className='flex justify-between mb-2'>
            <p className='font-semibold text-gray-700'>Learning Progress</p>
            <p className='text-indigo-500 font-semibold'>{progress}%</p>
           </div>

           <div className='w-full bg-gray-200 h-4 rounded-full overflow-hidden'>
            <div className='bg-linear-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500'
            style={{width:`${progress}%`}}></div>
           </div>

           <p className='text-sm text-gray-500 mt-2'>{completedSkills.length}/{roadmap.length} skills completed</p>
        </div>

      </div>     
    </div>
  )
}

export default Roadmap