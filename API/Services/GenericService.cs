using Microsoft.EntityFrameworkCore;
using ProjetoFinalC_.Data;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GenericService<T> : IGenericService<T> where T : class
{
    private readonly Context _context;

    public GenericService(Context context)
    {
        _context = context;
    }

    public async Task CreateAsync(T model)
    {
        if (typeof(T) == typeof(SaleProduct))
        {
            var saleProduct = model as SaleProduct;
            await UpdateProductStockAsync(saleProduct.Id, saleProduct.Quantity);
          
        }
        _context.Set<T>().Add(model);
        await _context.SaveChangesAsync();
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetByIdAsync(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task UpdateAsync(Guid id, T updatedModel)
    {
        var existingEntity = await _context.Set<T>().FindAsync(id);

        if (existingEntity == null)
            throw new InvalidOperationException($"{typeof(T).Name} not found");

        _context.Entry(existingEntity).CurrentValues.SetValues(updatedModel);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.Set<T>().FindAsync(id);

        if (entity == null)
            throw new InvalidOperationException($"{typeof(T).Name} not found");

        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }
    private async Task UpdateProductStockAsync(Guid id, int qty )
    {

        // Get the existing product from the database
        var existingProduct = await _context.Products.FindAsync(id);

        if (existingProduct == null)
        {
            // Handle the case where the product doesn't exist
            throw new InvalidOperationException($"Product with Id {id} not found");
        }

        // Subtract the sale quantity from the product stock
        existingProduct.Quantity -= qty;
        if(existingProduct.Quantity < 0)
        {
            throw new InvalidOperationException("Stock supply not sufficient");
        }

        // Update the product in the database
        _context.Entry(existingProduct).CurrentValues.SetValues(existingProduct);
        await _context.SaveChangesAsync();
    }

}
