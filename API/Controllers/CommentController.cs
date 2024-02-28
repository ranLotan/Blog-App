using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Controllers
{
    [Authorize]
    public class CommentController : BaseApiController
    {
        private DataContext _context;

        public CommentController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        // GET: api/comment/sortedbydate (new)
        [HttpGet("sortedbydate")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPostCommentsSortedByDate(int postId)
        {
            var comments = await _context.Comments
                //.Include(p => p.Post)
                .Where(p => p.PostId == postId)
                .OrderByDescending(p => p.CreationDate)
                .ToListAsync();

            var postDtos = comments.Select(p => new CommentDto
            {
                Id = p.Id,
                Content = p.Content,
                Author = p.Author,
                PostId = p.PostId,
            }).ToList();

            return Ok(postDtos);
        }

        // POST: api/comment
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<PostDto>> AddCommentByPostId([FromBody] CommentDto commentDto)
        {
            if (commentDto == null || commentDto.Id < 0)
            {
                return BadRequest();
            }
 
            if (!PostExits(commentDto.PostId))
            {
                return NotFound();
            }

            PostComment newComment = new PostComment()
            {
                Content = commentDto.Content,
                Author = commentDto.Author,
                PostId = commentDto.PostId,
            };

            _context.Comments.Add(newComment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Failed to create comment due to database error.");
            }

            commentDto.Id = newComment.Id;
            commentDto.DateCreated = newComment.CreationDate.ToString("yyyy-MM-dd HH:mm:ss");
            return Ok(commentDto);
        }

        [AllowAnonymous]
        // PUT: api/Post
        [HttpPut]
        public async Task<IActionResult> EditPostById([FromBody] CommentDto commentDto)
        {
            if (commentDto == null || commentDto.Id <= 0)
            {
                return BadRequest();
            }

            var comment = await _context.Comments.FindAsync(commentDto.Id);

            if (comment == null)
            {
                return NotFound();
            }

            comment.Content = commentDto.Content;
            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (!PostExits(commentDto.PostId))
                {
                    return NotFound("post wasn't fount in DB");
                }
                else
                {
                    return StatusCode(500, "Failed to create comment due to database error.");
                }
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Failed to delete comment due to database error.");
            }

            return NoContent();
        }

        private bool PostExits(int postId)
        {
            return _context.Posts.Any(p => p.Id == postId);
        }
    }
}
