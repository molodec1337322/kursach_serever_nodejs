using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

public class APIWorker
{
    public APIWorker()
    { }

    public static async Task<string> RegisterAsync(string email, string nickname, string password)
    {
        try
        {
            string answer = string.Empty;
            WebRequest request = WebRequest.Create("http://localhost:5617/auth/register");
            request.ContentType = "application/json";
            request.Method = "POST";

            using (StreamWriter streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = "{\"email\": \"" + email + "\", \"password\": \"" + password + "\", \"nickname\": \"" + nickname + "\"}";
                streamWriter.Write(json);
            }

            WebResponse response = await request.GetResponseAsync();

            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                answer = await reader.ReadToEndAsync();
            }

            response.Close();

            AuthInfo authResponse = JsonConvert.DeserializeObject<AuthInfo>(answer);
            //Console.WriteLine("Ответ сервера: " + authResponse.message);

            return authResponse.message;
        }
        catch(WebException ex)
        {
            if(ex.Status == WebExceptionStatus.ProtocolError)
            {
                HttpWebResponse httpResponse = (HttpWebResponse)ex.Response;
                if((int)httpResponse.StatusCode == 409)
                {
                    return "User with this email already exists";
                }
                else if((int)httpResponse.StatusCode == 500)
                {
                    return "Server error";
                }
            }
            return "Unknown error";
        }
    }

    public static async Task<string> LoginAsync(string email, string password)
    {
        try
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

            AuthInfo authResponse = JsonConvert.DeserializeObject<AuthInfo>(answer);

            return authResponse.message;
        }
        catch (WebException ex)
        {
            if (ex.Status == WebExceptionStatus.ProtocolError)
            {
                HttpWebResponse httpResponse = (HttpWebResponse)ex.Response;
                if ((int)httpResponse.StatusCode == 404)
                {
                    return "Email or password invalid";
                }
            }
            return "Unknown error";
        }
    }

    public static async Task<string> GetHeroesAsync()
    {
        try
        {
            string answer = string.Empty;
            WebRequest request = WebRequest.Create("http://localhost:5617/userInfo/getHeroes");

            request.ContentType = "application/json";
            request.Method = "GET";

            request.Headers.Add("Authorization", TokenHolder.UserToken);

            WebResponse response = await request.GetResponseAsync();

            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                answer = await reader.ReadToEndAsync();
            }

            response.Close();

            return answer;
        }
        catch (WebException ex)
        {
            if (ex.Status == WebExceptionStatus.ProtocolError)
            {
                HttpWebResponse httpResponse = (HttpWebResponse)ex.Response;
                if ((int)httpResponse.StatusCode == 500)
                {
                    return "Server error";
                }
            }
            return "Unknown error";
        }
    }

    public static async Task<string> GetHeroSpellsAsync(string heroId)
    {
        try
        {
            string answer = string.Empty;
            WebRequest request = WebRequest.Create("http://localhost:5617/userInfo/getHeroSpells");

            request.ContentType = "application/json";
            request.Method = "POST";

            request.Headers.Add("Authorization", TokenHolder.UserToken);

            using (StreamWriter streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = "{\"hero_id\":" + heroId + "}";
                streamWriter.Write(json);
            }

            WebResponse response = await request.GetResponseAsync();

            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                answer = await reader.ReadToEndAsync();
            }

            response.Close();

            return answer;
        }
        catch (WebException ex)
        {
            if (ex.Status == WebExceptionStatus.ProtocolError)
            {
                HttpWebResponse httpResponse = (HttpWebResponse)ex.Response;
                if ((int)httpResponse.StatusCode == 500)
                {
                    return "Server error";
                }
            }
            return "Unknown error";
        }
    }
}

