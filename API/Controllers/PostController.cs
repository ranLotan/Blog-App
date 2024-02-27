﻿using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
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

        [AllowAnonymous]
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
                AuthorId = p.AuthorId
            }).ToList();

            return Ok(postDtos);
        }

        // POST: api/Post
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<PostDto>> AddPostByUserID([FromBody] PostDto postDto)
        {
            if (postDto == null || postDto.Id < 0)
            {
                return BadRequest();
            }

            if (!UserExists(postDto.AuthorId))
            {
                return NotFound();
            }

            BlogPost newPost = new BlogPost(postDto);

            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();

            return Ok(newPost);
        }



        [AllowAnonymous]
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
            catch (Exception)
            {
                if (!PostExists(postDto.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
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

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}