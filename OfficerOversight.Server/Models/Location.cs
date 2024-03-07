namespace OfficerOversight.Server.Models
{
    public class Location
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
    }
}
