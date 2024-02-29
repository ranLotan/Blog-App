export interface User {
    userName : string,
    userId: string,
    token?: string,
    error?: string
}

export interface IPost{
    id: string,
    title: string,
    content: string,
    authorId: string,
    authorName: string,
    dateCreated: string
}

export interface IComment {
    id: string;
    content: string;
    author: string;
    postId: string;
    authorId: string;
    dateCreated?: string;
  }
export interface IEditCommentInfo {
    commentId: string;
    content: string;
  }

  