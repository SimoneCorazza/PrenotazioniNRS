namespace PrenotazioniNRS.Domain
{
    public interface IRepository<T> where T : class
    {
        Task SaveChanges();

        Task Add(T entity);

        void Remove(T entity);
    }
}
