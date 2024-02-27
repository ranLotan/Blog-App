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