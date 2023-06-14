import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';
function App() {
  const [renderPage, setRenderPage] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <header className="w-full flex justify-between items-center bg-white dark:bg-gray-700 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
          <Link to="/">
            <img src={logo} alt="logo" className="w-auto h-12 object-contain" />
          </Link>

        </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-20">
                  <CreatePost renderPage={renderPage} setRenderPage={setRenderPage} />
                  <Home renderPage={renderPage} />
                </div>
              }
            />
            {/* <Route path="/create-post" element={<CreatePost />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
