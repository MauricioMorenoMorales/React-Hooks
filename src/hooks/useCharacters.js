import { useState, useEffect } from 'react'

const useCharacters = url => {
	const [character, setCharacter] = useState([])
	useEffect(
		() =>
			fetch(url)
				.then(response => response.json())
				.then(data => setCharacter(data.results)),
		[],
	)
	return character
}

export default useCharacters
