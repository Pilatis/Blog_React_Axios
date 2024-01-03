import blogFetch from "../../axios/config";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Admin.css"
import Loading from "../../components/Loading/Loading";


const Admin = () => { //Define o componente React chamado Admin
    const [posts, setPosts] = useState([]); //Cria uma variável chamada post usando o hook useState. a variável armazena um array de posts que sao da APII

    const getPosts = async () => {
        try {
            const response = await blogFetch.get("/posts");
            setPosts(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

const deletePost = async (id) => { //usada para excluir um post da API. A função recebe o ID do post a ser excluído como parâmetro. A função usa a função blogFetch para fazer uma solicitação DELETE 
  try {
    await blogFetch.delete(`/post/${id}`)
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

  } catch (error) {
    console.log(error)
  }
  
}

  useEffect(() => { //chamar a função getposts quando o componente
    getPosts()      //Admin for chamado
  }, []);

  return (
    <div className="admin">
      <h1>Gerenciar posts</h1>
      {posts.length === 0 ? ( // verifica se a variável de estado `posts`       
        (<Loading />)  // esta vazia se estiver vai carregar o `p`
      ) : (
        posts.map((post) => (
            <div className="post" key={post.id}>
                <h2>{post.title}</h2>
            <div className="actions">
                <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>
                    Editar
                </Link>
                 <button className="btn delete-btn" onClick={() => deletePost(post.id)}>
                     Excluir
                 </button>
            </div>
            </div>
        ))
      )}
    </div>
  );
};



export default Admin;