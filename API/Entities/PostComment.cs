using API.DTOs;
using Microsoft.Extensions.Hosting;
using System.Runtime.CompilerServices;

namespace API.Entities
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; } 
        public int AhutorId { get; set; }

        // Foreign key 
        public int PostId { get; set; }

        public BlogPost Post { get; set; }

        public DateTimeOffset CreationDate { get; set; } = DateTimeOffset.UtcNow;

        public CommentDto ConvertToCommentDto()
        {
            return new CommentDto()
            {
                Id = Id,
                Content = Content,
                Author = Author,
                PostId = PostId,
                DateCreated = CreationDate.ToString("yyyy-MM-dd HH:mm:ss"),
                AuthorId = AhutorId,
            };
        }
    }
}
