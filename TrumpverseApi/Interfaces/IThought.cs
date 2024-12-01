namespace TrumpverseApi.Interfaces;

interface IThought
{
    int Id { get; set; }
    string Heading { get; set; }
    string Content { get; set; }
    string? Image { get; set; }
    string Category { get; set; }

}