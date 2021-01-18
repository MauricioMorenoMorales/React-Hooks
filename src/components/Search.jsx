import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
	return (
		<div>
			<div className="Search">
				<input
					type="text"
					name=""
					value={search}
					ref={searchInput}
					onChange={handleSearch}
				/>
			</div>
		</div>
	)
}

export default Search
