import React, { useState, useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const Header = () => {
	const [darkMode, setdarkMode] = useState(false)
	const color = useContext(ThemeContext)

	const handleClick = () => setdarkMode(!darkMode)

	return (
		<div className="Header">
			<h1 style={{ color }}>ReactHooks</h1>
			<button type="button" onClick={handleClick}>
				{darkMode ? 'Dark Mode' : 'Light Mode'}
			</button>
			<button type="button" onClick={() => setdarkMode(!darkMode)}>
				{darkMode ? 'Dark Mode' : 'Light Mode'}
			</button>
		</div>
	)
}

export default Header
