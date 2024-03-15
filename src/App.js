
import './App.css';
import React, { createContext, useState, useEffect } from "react";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AnimeDetail from './pages/AnimeDetail';
import AnimeWatch from './pages/AnimeWatch';
import NotFoundPage from './pages/NotFoundPage';
import SearchResult from './pages/SearchResult';
import MangaDetails from './pages/MangaDetails';
import CatPage from './pages/CatPage';

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
        <div className={` ${theme?"bg-[#ffffff] text-black":"bg-[#242424] text-[#fff]"} '} `} >
          <Router>
            <themehandlecontext.Provider value={themeHandle}>
              <header> <NavBar /></header>
            </themehandlecontext.Provider>
            <main className='py-16  px-3 sm:px-16 flex flex-col justify-center items-center *:w-full'>
              <Routes>
                <Route exact path='/' element={<HomePage />} ></Route>
                <Route path={'/:type'} element={<CatPage />} />
                <Route path={`/animeDetail/:id/:type/*`} element={<AnimeDetail />} ></Route>
                <Route path={`/mangaDetail/:id/:type/*`} element={<MangaDetails />} ></Route>
                <Route exact path={`/AnimeWatch/:id`} element={<AnimeWatch />} />
                <Route exact path={`/Search/:id/:type`} element={<SearchResult />} />
                <Route path='/notfound' element={<NotFoundPage />} />
              </Routes>
            </main>
            <footer><Footer /></footer>
          </Router>
        </div>
      </themecontext.Provider>
    </>
  )
}
export default App;