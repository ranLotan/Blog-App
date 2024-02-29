using API.Entities;

namespace API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }

        // Foreign key 
        public int PostId { get; set; }
        public int AuthorId { get; set; } 
        public string DateCreated { get; set; }
    }
}
