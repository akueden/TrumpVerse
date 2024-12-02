using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrumpverseApi.Contexts;
using TrumpverseApi.Models;

namespace TrumpverseApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ThoughtController : ControllerBase
{
    private readonly ThoughtContext _thoughtContext;

    public ThoughtController(ThoughtContext thoughtContext)
    {
        _thoughtContext = thoughtContext;
    }

    [HttpGet]
    public async Task<List<Thought>> Get()
    {

        List<Thought> thoughts = await _thoughtContext.Thoughts.ToListAsync();
        return thoughts;

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Thought>> Get(int id)
    {
        try
        {
            Thought? thought = await _thoughtContext.Thoughts.FindAsync(id);
            if (thought == null)
            {
                return NotFound();
            }
            return Ok(thought);
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet]
    [Route("[action]/{category}")]
    public async Task<ActionResult<Thought>> GetByCategory(string category)
    {
        try
        {
            List<Thought> thoughts = await _thoughtContext
                .Thoughts.Where(
                    thought => thought.Category != null && thought.Category.ToLower().Contains(category.ToLower())
                )
                .ToListAsync();
            return Ok(thoughts);
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Thought>> Post(Thought newThought)
    {
        try
        {
            _thoughtContext.Thoughts.Add(newThought);
            await _thoughtContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPut]
    public async Task<ActionResult<Thought>> Put(Thought updatedThought)
    {
        try
        {
            _thoughtContext.Entry(updatedThought).State = EntityState.Modified;
            await _thoughtContext.SaveChangesAsync();
            return updatedThought;
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Thought>> Delete(int id)
    {
        try
        {
            Thought? thoughtToDelete = await _thoughtContext.Thoughts.FindAsync(id);

            if (thoughtToDelete != null)
            {
                _thoughtContext.Thoughts.Remove(thoughtToDelete);
                await _thoughtContext.SaveChangesAsync();
                return thoughtToDelete;
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}