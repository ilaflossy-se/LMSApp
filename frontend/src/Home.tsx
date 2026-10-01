import React from 'react';
import Footer from './Footer';
import exp from 'constants';

function Home() {
    return (
        <main className="home-container">

        {/* Основной контент */}
        <div className="main-content">
          <h1>Welcome to Home App</h1>

          <p>
            This is the home content area.
          </p>
        </div>

        {/* Footer */}
        <Footer />

      </main>
    )
}
export default Home;