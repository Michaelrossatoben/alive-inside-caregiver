import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Coach from './pages/Coach'
import MusicDetective from './pages/MusicDetective'
import LoadHeadset from './pages/LoadHeadset'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="coach" element={<Coach />} />
          <Route path="music" element={<MusicDetective />} />
          <Route path="headset" element={<LoadHeadset />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
