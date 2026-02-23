using System;
using Mercadados_API.Contexts;
using Mercadados_API.Interfaces;
using Mercadados_API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Mercadados_API.Repositories
{
    public class ImagemRepository : IImagemRepository
    {

        private readonly Context _context;

        public ImagemRepository(Context context)
        {
            _context = context;
        }


        public async Task<Imagem> CreateAsync(Imagem imagem)
        {
            _context.Imagens.Add(imagem);
            await _context.SaveChangesAsync();
            return imagem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var imagem = await _context.Imagens.FindAsync(id);
            if(imagem == null)
            {
                return false;
            }

            _context.Imagens.Remove(imagem);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Imagem>> GetAllAsync()
        {
            return await _context.Imagens.ToListAsync();
        }

        public async Task<Imagem?> GetByIdAsync(int id)
        {
            return await _context.Imagens.FindAsync(id);
        }

        public async Task<bool> UpdateAsync(Imagem imagem)
        {
            _context.Imagens.Update(imagem);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
