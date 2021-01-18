import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react'

const initialState = {
	favorites: [],
}

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			}
		default:
			return state
	}
}

//!||
const Characters = () => {
	const [characters, setCharacters] = useState([])
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	const [search, setSearch] = useState('')
	const searchInput = useRef(null)
	// const filteredUsers = characters.filter(user =>
	// 	user.name.toLowerCase().includes(search.toLowerCase()),
	// )
	const filteredUsers = useMemo(
		() =>
			characters.filter(user =>
				user.name.toLowerCase().includes(search.toLowerCase()),
			),
		[characters, search],
	)
	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
			.then(response => response.json())
			.then(data => setCharacters(data.results))
			.catch(error => console.log(error))
	}, [])
	const handleClick = favorite => {
		dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
	}

	const handleSearch = () => {
		setSearch(searchInput.current.value)
	}

	return (
		<div className="Characters">
			{favorites.favorites.map(favorite => (
				<li key={favorite.id}>{favorite.name}</li>
			))}
			<div className="Search">
				<input
					type="text"
					name=""
					value={search}
					ref={searchInput}
					onChange={handleSearch}
				/>
			</div>
			{filteredUsers.map(character => (
				<div class="item" key={character.id}>
					<h2>{character.name}</h2>
					<button type="button" onClick={() => handleClick(character)}>
						Agregar a favoritos
					</button>
				</div>
			))}
		</div>
	)
}

export default Characters
