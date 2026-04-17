import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import GithubAnalyzer from './pages/GithubAnalyzer'
import Progress from './pages/Progress'
import Roadmap from './pages/Roadmap'
import SkillAnalysis from './pages/SkillAnalysis'
import Footer from './components/Footer'
import Quiz from './pages/Quiz'
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/analysis' element={<SkillAnalysis/>}/>
          <Route path='/progress' element={<Progress/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/github' element={<GithubAnalyzer/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
