using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Xml.Linq;

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
                .Where(p => p.PostId == postId)
                .OrderByDescending(p => p.CreationDate)
                .ToListAsync();

            var postDtos = comments.Select(p => new CommentDto
            {
                Id = p.Id,
                Content = p.Content,
                Author = p.Author,
                PostId = p.PostId,
                AuthorId = p.AhutorId,
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
                AhutorId = commentDto.AuthorId
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
        // PUT: api/comment
        [HttpPut]
        public async Task<ActionResult<CommentDto>> EditCommentById([FromBody] CommentDto commentDto)
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

            //var response = convertToCommentResponse(comment);
            return Ok(comment.ConvertToCommentDto());
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentDto>> DeleteComment(int id)
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

            var response = comment.ConvertToCommentDto();
            return Ok(response);
        }

        private bool PostExits(int postId)
        {
            return _context.Posts.Any(p => p.Id == postId);
        }
    }
}
