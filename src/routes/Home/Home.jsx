import blogFetch from "../../axios/config" //axios é uma bibliotecas de HTTP
import { useState, useEffect} from "react"; //hooks do react
import { Link } from "react-router-dom"; //Criar links que navegam nas paginas
import "./Home.css"

const Home = () => {
   const [posts, setPosts] = useState([]) //armazenar os posts da API

   const getPosts = async() => { //faz uma requisição GET para a API JSONPlaceholder para recuperar os posts mais recentes.
     
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;

        setPosts(data);
    } catch (error) {
       console.log(error) //Essas função faz uma requisição GET para recyperar posts mais recentes. A biblioteca axios usa o HTTP e as respostas são armazenadas no estado posts se falhar vai ter uma mensagem ERROR
    }

   }

    useEffect(() => { //Usado para chamar a função getPost. 
      getPosts()   //O array vazio passado como segundo argumento para o hook
    }, [])           //que deve ser chamada apenas quando o componente é montado


    return (
        <div className="home">
        <h1>Últimos Posts</h1>
        {posts.length === 0 ? (<p>Carregando...</p>) : (
          posts.map((post) => (
            <div className="post" key={post.id}> 
              <h2>{post.title}</h2>
              <Link to={`/posts/${post.id}`} className="btn">Ler mais</Link>
            </div>
          ))
        )}
        </div>
    )
}

export default Home;
