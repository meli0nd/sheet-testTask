import React, { FC, useEffect } from "react"
import PostItem, { TPostItem } from "./PostItem"
import { useSelector } from "react-redux"
import { TAppState } from "../Redux/store/store"

type TTable = {
  posts: TPostItem[]
  sortById: () => void
  sortingByTitle: () => void
  sortingByBody: () => void
}

const Table: FC<TTable> = ({
  posts,
  sortById,
  sortingByBody,
  sortingByTitle,
}) => {
  const isFetching = useSelector(
    (state: TAppState) => state.postReducer.isFetching
  )

  useEffect(() => {}, [posts])

  return (
    <div className="table">
      <div className="table-top">
        <div className="table-top_id" onClick={sortById}>
          <span>ID</span>
          <img src="img/arrow-icon.svg" alt="arrow" />
        </div>
        <div className="table-top_heading" onClick={sortingByTitle}>
          <span>Заголовок</span>
          <img src="img/arrow-icon.svg" alt="arrow" />
        </div>
        <div className="table-top_descr" onClick={sortingByBody}>
          <span>Описание</span>
          <img src="img/arrow-icon.svg" alt="arrow" />
        </div>
      </div>
      <div className="postContainer">
        {isFetching ? (
          <div className="loaderw">
            <img src="img/loader.svg" alt="" />
          </div>
        ) : (
          posts.map((item) => (
            <PostItem
              userId={item.userId}
              key={item.id}
              title={item.title}
              body={item.body}
              id={item.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Table
