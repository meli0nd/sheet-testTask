import axios from "axios"

type TPosts = {
  userId: number
  id: number
  title: string
  body: string
}

let initialState = {
  isFetching: true,
  posts: [] as TPosts[],
  sliceFrom: 0,
  sliceTo: 10,
}

type TInitialState = typeof initialState

const SET_POSTS = "SET_POSTS"
const IS_FETCHING = "IS_FETCHING"
const NEXT_PAGE = "NEXT_PAGE"
const PREV_PAGE = "PREV_PAGE"

export const postReducer = (
  state = initialState,
  action: any
): TInitialState => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.posts }
    }
    case IS_FETCHING: {
      return { ...state, isFetching: action.isFetching }
    }
    case NEXT_PAGE: {
      if (state.sliceFrom === 90 && state.sliceTo === 100) {
        return {
          ...state,
          sliceFrom: (state.sliceFrom = 0),
          sliceTo: (state.sliceTo = 10),
        }
      } else {
        return {
          ...state,
          sliceFrom: state.sliceFrom + 10,
          sliceTo: state.sliceTo + 10,
        }
      }
    }
    case PREV_PAGE: {
      if (state.sliceFrom === 0 && state.sliceTo === 10) {
        return {
          ...state,
          sliceFrom: (state.sliceFrom = 90),
          sliceTo: (state.sliceTo = 100),
        }
      } else {
        return {
          ...state,
          sliceFrom: state.sliceFrom - 10,
          sliceTo: state.sliceTo - 10,
        }
      }
    }

    default: {
      return initialState
    }
  }
}

type TSetPostsAction = {
  type: typeof SET_POSTS
  posts: TPosts
}

const setPostAction = (posts: TPosts): TSetPostsAction => ({
  type: SET_POSTS,
  posts,
})

type TIsFetching = {
  type: typeof IS_FETCHING
  isFetching: boolean
}

export const isFetchingAction = (isFetching: boolean): TIsFetching => ({
  type: IS_FETCHING,
  isFetching,
})

type TNextPage = {
  type: typeof NEXT_PAGE
}

export const nextPageAction = (): TNextPage => ({
  type: NEXT_PAGE,
})

type TPrevPage = {
  type: typeof PREV_PAGE
}

export const prevPageAction = (): TPrevPage => ({
  type: PREV_PAGE,
})

export const setPostsThunk = (): any => async (dispatch: any) => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    )
    dispatch(setPostAction(data))
    dispatch(isFetchingAction(false))
  } catch (error) {
    console.log(error)
  }
}

export default postReducer
