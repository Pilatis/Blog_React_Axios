import axios from "axios";

const blogFetch = axios.create({ //Cria uma instância do Axios com configurações específicas para uma API
    baseURL: "https://jsonplaceholder.typicode.com", // Define a URL base para todas as requisições feitas com essa instância
    headers: {
        "Content-Type": "application/json",//indicar que os dados enviados nas requisições serão no formato JSON.Formato de array javascript
    }
})

export default blogFetch //qualquer requisição feita usando blogFetch terá as configurações padrão
