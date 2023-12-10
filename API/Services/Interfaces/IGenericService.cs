namespace ProjetoFinalC_.Services.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        Task CreateAsync(T model);
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task UpdateAsync(Guid id, T updatedModel);
        Task DeleteAsync(Guid id);
    }
}