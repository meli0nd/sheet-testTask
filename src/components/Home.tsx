import React, { FC, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import qs from "qs"
import "../App.css"
import Search from "../components/Search"
import Table from "../components/Table"
import Pagination from "../components/Pagination"
import { useSelector } from "react-redux"
import { TAppState, useAppDispatch } from "../Redux/store/store"
import { setPostsThunk } from "../Redux/store/postReducer"

const Home: FC = () => {
  const navigate = useNavigate()
  const [sliceFrom, setSliceFrom] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sliceTo, setSliceTo] = useState<number>(10)
  const [muting, setMuting] = useState(1)
  const [sortedTitle, setSortedTitle] = useState(false)
  const [sortedBody, setSortedBody] = useState(false)
  const [sortedId, setSortedId] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredPost, setFilteredPost] = useState<any>([])
  const posts = useSelector((state: TAppState) => state.postReducer.posts)
  const dispatch = useAppDispatch()
  const postLength = posts.length

  const postSliced = filteredPost.length
    ? filteredPost.slice(sliceFrom, sliceTo)
    : posts.slice(sliceFrom, sliceTo)
  // кнопка вперед
  const nextPage = () => {
    if (
      (sliceFrom === postLength - 10 && sliceTo === postLength) ||
      (filteredPost.length &&
        sliceFrom > filteredPost.length - 10 &&
        sliceTo > Math.ceil(filteredPost.length))
    ) {
      setCurrentPage(1)
      setSliceFrom(0)
      setSliceTo(10)
    } else {
      setCurrentPage((prev) => prev + 1)
      setSliceFrom((prev) => prev + 10)
      setSliceTo((prev) => prev + 10)
    }
  }
  // Кнопка назад
  const prevPage = () => {
    if (
      sliceFrom < 0 ||
      sliceTo < 10 ||
      sliceFrom < filteredPost.length - 10 ||
      sliceTo < Math.ceil(filteredPost.length)
    ) {
      const currPage: number = filteredPost.length
        ? Math.ceil(filteredPost.length / 10)
        : Math.ceil(postLength / 10)
      if (filteredPost.length) {
        setCurrentPage(currPage)
        setSliceFrom(filteredPost.length - 10)
        setSliceTo(filteredPost.length)
      } else {
        setCurrentPage(currPage)
        setSliceFrom(90)
        setSliceTo(100)
      }
    } else {
      setCurrentPage((prev) => prev - 1)
      setSliceFrom((prev) => prev - 10)
      setSliceTo((prev) => prev - 10)
    }
  }
  // Сортировка по заголовку
  const sortingByTitle = () => {
    if (sortedTitle && !sortedId && !sortedBody) {
      setFilteredPost(filteredPost.reverse())
      setMuting((prev) => prev + 1)
    } else {
      if (filteredPost.length) {
        filteredPost.sort(function (a: any, b: any) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
        setFilteredPost(filteredPost)
        setMuting((prev) => prev + 1)
        setSortedTitle(true)
        setSortedBody(false)
        setSortedId(false)
      } else {
        posts.sort(function (a: any, b: any) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
        setFilteredPost(posts)
        setMuting((prev) => prev + 1)
        setSortedTitle(true)
        setSortedBody(false)
        setSortedId(false)
      }
    }
  }

  // Сортировка по  описанию
  const sortingByBody = () => {
    if (sortedBody && !sortedId && !sortedTitle) {
      setFilteredPost(filteredPost.reverse())
      setMuting((prev) => prev + 1)
    } else {
      if (filteredPost.length) {
        filteredPost.sort(function (a: any, b: any) {
          if (a.body < b.body) {
            return -1
          }
          if (a.body > b.body) {
            return 1
          }
          return 0
        })
        setFilteredPost(filteredPost)
        setMuting((prev) => prev + 1)
        setSortedBody(true)
        setSortedTitle(false)
        setSortedId(false)
      } else {
        posts.sort(function (a: any, b: any) {
          if (a.body < b.body) {
            return -1
          }
          if (a.body > b.body) {
            return 1
          }
          return 0
        })
        setFilteredPost(posts)
        setMuting((prev) => prev + 1)
        setSortedBody(true)
        setSortedTitle(false)
        setSortedId(false)
      }
    }
  }

  // Сортировка по ID

  const sortById = () => {
    if (sortedId && !sortedBody && !sortedTitle) {
      setMuting((prev) => prev + 1)
      filteredPost
        ? setFilteredPost(filteredPost.reverse())
        : setFilteredPost(posts.reverse())
    } else if (sortedTitle || sortedBody) {
      filteredPost
        ? setFilteredPost(filteredPost.reverse())
        : setFilteredPost(posts.reverse())
      setSortedId(true)
      setSortedBody(false)
      setSortedTitle(false)
    } else if (!sortedId) {
      setFilteredPost(posts.reverse())
      setSortedId(true)
      setSortedBody(false)
      setSortedTitle(false)
    }
  }

  // Поисковик

  const handleInput = (value: string) => {
    setCurrentPage(1)
    setSearchValue(value)
    setFilteredPost(
      posts.filter(
        (item) =>
          item.body.includes(value) ||
          item.title.includes(value) ||
          item.id.toString().includes(value.toString())
      )
    )
  }

  useEffect(() => {
    dispatch(setPostsThunk())

    // Отображение страницы в URL
    const queryString = qs.stringify({
      currentPage,
    })
    navigate(`?${queryString}`)
  }, [filteredPost, muting, currentPage])

  return (
    <div className="home">
      <Search searchValue={searchValue} setSearchValue={handleInput} />
      <Table
        posts={postSliced}
        sortById={sortById}
        sortingByBody={sortingByBody}
        sortingByTitle={sortingByTitle}
      />
      <Pagination
        filteredPosts={filteredPost}
        nextPage={nextPage}
        currentPage={currentPage}
        prevPage={prevPage}
      />
    </div>
  )
}

export default Home
