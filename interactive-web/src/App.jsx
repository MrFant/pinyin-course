import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Learn from './pages/Learn/Learn'
import Practice from './pages/Practice/Practice'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn/:chapterId" element={<Learn />} />
          <Route path="/practice/:chapterId" element={<Practice />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
