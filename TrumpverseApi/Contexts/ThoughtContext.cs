using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TrumpverseApi.Models;

namespace TrumpverseApi.Contexts;

public class ThoughtContext : DbContext
{
    public ThoughtContext(DbContextOptions<ThoughtContext> options) : base(options) { }

    public DbSet<Thought> Thoughts { get; set; }
}