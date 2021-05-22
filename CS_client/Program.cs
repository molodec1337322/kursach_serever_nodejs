using System;

namespace WebRequestsKursach1
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                APIWorker.LoginAsync("sdffsdfgfdsfggag@dfsdf.sdf", "sdga54541sdfgf254").Wait();
                Console.WriteLine("Успешно");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.WriteLine("что-то пошло не так");
            }
        }
    }
}
