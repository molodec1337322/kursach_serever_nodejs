using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebRequestsKursach1
{
    class APIWorker
    {
        public APIWorker()
        {}

        public static async Task RegisterAsync(string email, string password)
        {
            string answer = string.Empty;
            WebRequest request = WebRequest.Create("http://localhost:5617/auth/register");
            request.ContentType = "application/json";
            request.Method = "POST";

            using (StreamWriter streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = "{\"email\": \"" + email + "\", \"password\": \"" + password + "\"}";
                streamWriter.Write(json);
            }

            WebResponse response = await request.GetResponseAsync();

            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                answer = await reader.ReadToEndAsync();
            }

            response.Close();

            Responses.AuthInfo authResponse = JsonConvert.DeserializeObject<Responses.AuthInfo>(answer);
            Console.WriteLine("Ответ сервера: " + authResponse.message);
        }

        public static async Task LoginAsync(string email, string password)
        {
            string answer = string.Empty;
            WebRequest request = WebRequest.Create("http://localhost:5617/auth/login");

            request.ContentType = "application/json";
            request.Method = "POST";

            using (StreamWriter streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = "{\"email\": \"" + email + "\", \"password\": \"" + password + "\"}";
                streamWriter.Write(json);
            }

            WebResponse response = await request.GetResponseAsync();

            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                answer = await reader.ReadToEndAsync();
            }

            response.Close();

            Responses.AuthInfo authResponse = JsonConvert.DeserializeObject<Responses.AuthInfo>(answer);
            Console.WriteLine("Ответ сервера: " + authResponse.message);
        }
    }
}
