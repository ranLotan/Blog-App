namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] HashedPassword { get; set; }
        public byte[] HashedSalt { get; set; }
    }
}
