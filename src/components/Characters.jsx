import React, {
	useState,
	useReducer,
	useMemo,
	useRef,
	useCallback,
} from 'react'
import Search from './Search'

import useCharacters from '../hooks/useCharacters'

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

const API = 'https://rickandmortyapi.com/api/character/'

//!||
const Characters = () => {
	//const [characters, setCharacters] = useState([]) /*Ya no se usa para poder usar el custom hook characters */
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	const [search, setSearch] = useState('')
	const searchInput = useRef(null)
	// const filteredUsers = characters.filter(user =>
	// 	user.name.toLowerCase().includes(search.toLowerCase()),
	// ) /*En vez de esto usamos el otro filtered users */
	const characters = useCharacters(API)

	const filteredUsers = useMemo(
		() =>
			characters.filter(user =>
				user.name.toLowerCase().includes(search.toLowerCase()),
			),
		[characters, search],
	)
	// useEffect(() => { /*Ya no se usa para poder usar el custom hook characters */
	// 	fetch('https://rickandmortyapi.com/api/character/')
	// 		.then(response => response.json())
	// 		.then(data => setCharacters(data.results))
	// 		.catch(error => console.log(error))
	// }, [])
	const handleClick = favorite => {
		dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
	}

	// const handleSearch = () => {
	// 	setSearch(searchInput.current.value)
	// }

	const handleSearch = useCallback(
		() => setSearch(searchInput.current.value),
		[],
	)

	return (
		<div className="Characters">
			{favorites.favorites.map(favorite => (
				<li key={favorite.id}>{favorite.name}</li>
			))}
			<Search
				search={search}
				searchInput={searchInput}
				handleSearch={handleSearch}
			/>
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
