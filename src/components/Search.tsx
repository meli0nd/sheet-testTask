import React, { FC } from "react"

type TSearch = {
  searchValue: string
  setSearchValue: (value: string) => void
}

const Search: FC<TSearch> = ({ setSearchValue, searchValue }) => {
  return (
    <div className="search">
      <div className="searchContainer">
        <input
          value={searchValue}
          type="search"
          name="search"
          id="search"
          placeholder="Поиск"
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <img
          style={{ cursor: "pointer" }}
          src="img/search-icon.svg"
          alt="search-icon"
        />
      </div>
    </div>
  )
}

export default Search
