using API.DTOs;

namespace API.Entities
{
    public class BlogPost
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        // Foreign key referencing AppUser.Id
        public int AuthorId { get; set; }

        public AppUser Author { get; set; }

        public DateTimeOffset CreationDate { get; set; } = DateTimeOffset.UtcNow;

        //public ICollection<PostComment> Comments { get; set; }
        public BlogPost() { }
        public BlogPost(PostDto newpost)
        {
            Title = newpost.Title;
            Content = newpost.Content;
            AuthorId = newpost.Id;
        }
    }
}
