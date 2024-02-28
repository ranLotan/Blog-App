using API.Entities;

namespace API.DTOs
{
    public class PostDto
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string DateCreated { get; set ; }
        public PostDto() { }
        public PostDto(BlogPost newPost)
        {
            Id = newPost.Id;
            Title = newPost.Title;
            Content = newPost.Content;
            AuthorId = newPost.AuthorId;
            AuthorName = newPost.Author.UserName;
            DateCreated = newPost.CreationDate.ToString("yyyy-MM-dd HH:mm:ss"); // change "yyyy-MM-dd HH:mm:ss" to a global date format or ad an extention method
        }
    }
}
