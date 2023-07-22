import React, { FC } from "react"
import { TAppState } from "../Redux/store/store"
import { useSelector } from "react-redux"

type TPagination = {
  currentPage: number
  nextPage: () => void
  prevPage: () => void
  filteredPosts: any
}

const Pagination: FC<TPagination> = ({
  nextPage,
  prevPage,
  currentPage,
  filteredPosts,
}) => {
  const posts = useSelector((state: TAppState) => state.postReducer.posts)
  const pagesCount = filteredPosts.length
    ? Math.ceil(filteredPosts.length / 10)
    : Math.ceil(posts.length / 10)

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <span onClick={prevPage}>Назад</span>
      <div className="page-numbers">
        {pages.map((item, index) => (
          <span key={index} className={currentPage === item ? "active" : ""}>
            {item}
          </span>
        ))}
      </div>
      <span onClick={nextPage}>Далее</span>
    </div>
  )
}

export default Pagination
