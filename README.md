# Writers Blog App

Small scale simple blog project template suggetion for a small community of writers.
Users can create accounts, write and publish blog posts, and leave comments on other user’s posts.

## Delivered Requirements:

Frontend:
* Users can log in and register using a basic authentication system.
* Users can create and edit their own blog posts, containing title, content, and author information.
* Users can see a list of all published posts sorted by date.
* Clicking on a post title leads to the individual post page displaying its content and a comments section.
* Users can leave comments on posts, including their username and comment text.
* Comments are displayed under the corresponding post, with the most recent ones on top.
Backend:
* Store blog post data .
* Store comment data.
* Implement basic REST API endpoints for user registration, login, post creation/editing, and comment posting.

## Bonus Delivered Requirements:

* Store user data securely. 
* Enable users to edit and delete their comments.
• Implement basic error handling and user feedback messages. (partialy Delivered)

## Dependencies
  * Angular CLI 16 
  * C# .Net 8.0
  * DB: PostgreSQL

#### local PostgreSQL
Create PostgreSQL Database in Docker.
```
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgrespw postgres:latest
```

![docker](https://github.com/ranLotan/Blog-App/assets/152190030/3880dfee-1a6f-4c1b-8892-f5a503a88614)

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

1. Clone the repo
```
git clone https://github.com/your_username_/Project-Name.git
```
2. add defenitions to appsetting.json
  e.g.:
```
  "ConnectionStrings": {

    "DefaultConnection": "Server=localhost; Host=localhost; Port=5432; User Id=postgres; UserName=postgres; Password=postgrespw; Database=blogapp; "
  },
  "TokenKey": "super super strong long key"
```
3. Install NPM & NuGet packages
* Fronend:
```
cd blog-app/client
npm install
```
* Backend:
```
cd blog-app/api
dotnet restore
dotnet build
```
2. Run
* Fronend:
```
cd blog-app/client
ng serve
```
* Backend:
```
cd blog-app/api
dotnet run
```

## pictures from blog
client login and see all writen posts
![posts](https://github.com/ranLotan/Blog-App/assets/152190030/3d641b90-10d5-486e-b2a1-4d8d33b0fe2d)

clicking on a post redirects to the post component
![post](https://github.com/ranLotan/Blog-App/assets/152190030/1b1f56cb-887d-4e02-a9b3-6a3a83cc53dd)





