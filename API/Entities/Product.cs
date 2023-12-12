namespace ProjetoFinalC_.Entities
{
    public class Product: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public ICollection<SaleProduct> SaleProducts { get; set; } = new List<SaleProduct>();
    }
}
