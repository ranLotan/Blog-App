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
    body: string;
    username: string;
    userId: string;
    parentId: null | string;
    createdAt: string;
  }