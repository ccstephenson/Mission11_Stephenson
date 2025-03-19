using System;
using System.Collections.Generic;

namespace Mission11_Stephenson.API.Data;

public partial class Book
{
    public int BookId { get; set; }

    public string? Title { get; set; } = null!;

    public string? Author { get; set; } = null!;

    public string? Publisher { get; set; } = null!;

    public string? Isbn { get; set; } = null!;

    public string? Classification { get; set; } = null!;

    public string? Category { get; set; } = null!;

    public int? PageCount { get; set; }

    public double? Price { get; set; }
}
