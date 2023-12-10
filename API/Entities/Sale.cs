namespace ProjetoFinalC_.Entities
{
    public class Sale: BaseEntity
    {
        public User User { get; set; }
        public Guid UserId { get; set; }
        public DateTime SaleDate { get; set; }

        public ICollection<SaleProduct> SaleProducts { get; set; }
    }



}
