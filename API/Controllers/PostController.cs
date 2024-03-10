using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Xml.Linq;

namespace API.Controllers
{
    [Authorize]
    public class PostController : BaseApiController
    {
        private DataContext _context;


        public PostController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Post/sortedbydate (new)
        [HttpGet("sortedbydate")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPostsSortedByDate()
        {
            var posts = await _context.Posts
                .Include(p => p.Author)
                .OrderByDescending(p => p.CreationDate)
                .ToListAsync();

            var postDtos = posts.Select(p => new PostDto
            {
                Id = p.Id,
                Title = p.Title,
                Content = p.Content,
                AuthorId = p.AuthorId,
                AuthorName = p.Author.UserName,
                DateCreated = p.CreationDate.ToString("yyyy-MM-dd HH:mm:ss"),

            }).ToList();

            return Ok(postDtos);
        }

        // POST: api/Post
        [HttpPost]
        public async Task<ActionResult<PostDto>> AddPostByUserID([FromBody] PostDto postDto)
        {
            if (postDto == null || postDto.Id < 0)
            {
                return BadRequest();
            }
            var user = await GetUserById(postDto.AuthorId);
            if (user == null)
            {
                return NotFound();
            }

            BlogPost newPost = new BlogPost(postDto, user);
            
            _context.Posts.Add(newPost);
            //todo: add try catch
            await _context.SaveChangesAsync();

            return Ok(new PostDto(newPost));
        }

        // PUT: api/Post
        [HttpPut]
        public async Task<IActionResult> EditPostById([FromBody] PostDto postDto)
        {
            if (postDto == null || postDto.Id <= 0)
            {
                return BadRequest();
            }

            var post = await _context.Posts.FindAsync(postDto.Id);

            if (post == null)
            {
                return NotFound();
            }

            post.Title = postDto.Title;
            post.Content = postDto.Content;

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (!PostExists(postDto.Id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(500, "Failed to create comment due to database error.");
                }
            }
            return Ok();
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }

        private async Task<AppUser> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
