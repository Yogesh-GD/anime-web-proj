
import './App.css';
import React, { createContext, useState, useEffect } from "react";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AnimeDetail from './pages/AnimeDetail';
import AnimeWatch from './pages/AnimeWatch';
import NotFoundPage from './pages/NotFoundPage';
import AnimeSearchResult from './pages/AnimeSearchResult';
import Anime from './pages/Anime';
import Manga from './pages/Manga';
import MangaDetails from './pages/MangaDetails';

export const themecontext = createContext(null)
export const themehandlecontext = createContext(null)
function App() {
  const [theme, setTheme] = useState(!false)

  const themeHandle = () => {
    setTheme(!theme)

  }


  useEffect(() => {
  }, [theme])

  return (
    <>
      <themecontext.Provider value={theme}>
        <div className='appcont' style={theme ? { background: '#1B1B1E', } : {}}>
          <Router>
            <themehandlecontext.Provider value={themeHandle}>
              <NavBar />
            </themehandlecontext.Provider>
            <Routes>
              <Route exact path='/' element={<HomePage />} ></Route>
              <Route path={`/Anime`} element={<Anime />} ></Route>
              <Route path={`/Manga`} element={<Manga />} ></Route>
              <Route path={`/AnimeDetail/:id/*`} element={<AnimeDetail />} ></Route>
              <Route path={`/MangaDetail/:id/*`} element={<MangaDetails />} ></Route>
              <Route exact path={`/AnimeWatch/:id`} element={<AnimeWatch />} />
              <Route exact path={`/AnimeSearch/:id`} element={<AnimeSearchResult />} />
              <Route path='/notfound' element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </themecontext.Provider>
    </>
  )
}
export default App;