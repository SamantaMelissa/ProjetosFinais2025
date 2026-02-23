using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly Context _context;

        public FeedbackRepository(Context context)
        {
            _context = context;
        }
        public void Atualizar(Guid id, Feedback feedback)
        {
            try
            {
                Feedback feedbackBuscado = _context.Feedback.Find(id)!;

                if (feedbackBuscado != null)
                {
                    feedbackBuscado.Nota = feedback.Nota;
                }

                _context.Feedback.Update(feedbackBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Feedback BuscarPorId(Guid id)
        {
            try
            {
                return _context.Feedback.Find(id)!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(Feedback feedback)
        {
            try
            {
                feedback.FeedbackID = Guid.NewGuid();
                _context.Feedback.Add(feedback);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Feedback feedbackBuscado = _context.Feedback.Find(id)!;

                if(feedbackBuscado != null)
                {
                    _context.Feedback.Remove(feedbackBuscado);
                }

                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Feedback> Listar()
        {
            try
            {
                return _context.Feedback.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
