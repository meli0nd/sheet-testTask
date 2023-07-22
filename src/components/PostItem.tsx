import React, { FC } from "react"

export type TPostItem = {
  userId: number
  title: string
  id: number
  body: string
}

const PostItem: FC<TPostItem> = ({ title, id, body }) => {
  return (
    <div className="post">
      <div className="post_id">{id}</div>
      <div className="post_heading">{title}</div>
      <div className="post_descr">{body}</div>
    </div>
  )
}

export default PostItem
