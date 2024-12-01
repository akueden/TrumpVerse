using TrumpverseApi.Interfaces;

namespace TrumpverseApi.Models;

public class Thought : IThought
{
    public int Id { get; set; }
    public required string Heading { get; set; }
    public required string Content { get; set; }
    public string? Image { get; set; }
    public required string Category { get; set; }
}