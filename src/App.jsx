import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)
  
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(menu)
    }
  }

  // Dropdown menu items
  const menuData = {
    home: ['A1', 'A2', 'A3'],
    about: ['B1', 'B2', 'B3'],
    services: ['C1', 'C2', 'C3', 'C4'],
    contact: ['D1', 'D2', 'D3', 'D4']
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Elysian Portal</div>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <div className="dropdown-container">
                <a href="#" onClick={(e) => {e.preventDefault(); toggleDropdown('home')}}>
                  Home <span className="dropdown-arrow">▼</span>
                </a>
                {activeDropdown === 'home' && (
                  <ul className="dropdown-menu">
                    {menuData.home.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <a href={`/home/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li className="navbar-item">
              <div className="dropdown-container">
                <a href="#" onClick={(e) => {e.preventDefault(); toggleDropdown('about')}}>
                  About <span className="dropdown-arrow">▼</span>
                </a>
                {activeDropdown === 'about' && (
                  <ul className="dropdown-menu">
                    {menuData.about.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <a href={`/about/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li className="navbar-item">
              <div className="dropdown-container">
                <a href="#" onClick={(e) => {e.preventDefault(); toggleDropdown('services')}}>
                  Services <span className="dropdown-arrow">▼</span>
                </a>
                {activeDropdown === 'services' && (
                  <ul className="dropdown-menu">
                    {menuData.services.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <a href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li className="navbar-item">
              <div className="dropdown-container">
                <a href="#" onClick={(e) => {e.preventDefault(); toggleDropdown('contact')}}>
                  Contact <span className="dropdown-arrow">▼</span>
                </a>
                {activeDropdown === 'contact' && (
                  <ul className="dropdown-menu">
                    {menuData.contact.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <a href={`/contact/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
     
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
