using Microsoft.Extensions.Hosting;

namespace API.Entities
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; } 

        // Foreign key 
        public int PostId { get; set; }

        public BlogPost Post { get; set; }

        public DateTimeOffset CreationDate { get; set; } = DateTimeOffset.UtcNow;
    }
}
