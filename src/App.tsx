import { MainPage } from './pages/MainPage/MainPage.lazy';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage/AboutPage.lazy';
import { Suspense, useContext } from 'react';
import { THEMES, ThemeContext } from './Theme/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { classNames } from './helpers/classNames/classNames';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames('app', {}, [theme])}>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>about</Link>
      </div>
      <button onClick={toggleTheme}>{theme} theme</button>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/about'} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
