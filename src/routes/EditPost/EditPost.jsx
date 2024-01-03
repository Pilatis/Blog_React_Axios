import blogFetch from "../../axios/config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"


const NewPost = () => { //Define o compoenente React chamado NewPost. ele sera usado para editar um novo post
    const navigate = useNavigate(); //importa o hook useNavigate da biblioteca react-router-dom. O hook useNavigate permite que você navegue entre rotas de forma programática no seu aplicativo React.

    const [title, setTitle] = useState();//Criam uma variavel usando o hook
    const [body, setBody] = useState();  //useState

    const { id } = useParams(); //extrai o parâmetro id da URL da rota atual. O hook useParams da biblioteca react-router-dom é usado para acessar parâmetros de rota.

    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)

            const data = response.data;

            console.log(data);

            setTitle(data.title)
            setBody(data.body)
        } catch (error) {
            console.log(error)
        }
    };

    const editPost = async (e) => { //Usada para atualizar a postagem existente
        e.preventDefault(); //previne o comportamento padrao do formulario de carregar a página

        const post = { title, body, userId: 1 }; //cria um objeto contento dados da postagem

        await blogFetch.put(`/posts/${id}`, { //envia uma solicitação PUT
            body: post,    // para API para atualizar. o parametro id é a postagem
        })                 // sendo atualizada
        
        navigate("/"); //navega para a rota "/" 
    }
    useEffect(() => {
        getPost();
      }, []);

    return (
      <div className="new-post">
         <h2>Editando: {title}</h2>
          <form onSubmit={(e) => editPost(e)}>
              <div className="form-control">
                 <label htmlFor="title">Título:</label>
                 <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Digite o título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                 />
             </div>

             <div className="form-control">
                <label htmlFor="title">Título</label>
                <textarea 
                 name="body" 
                 id="body"
                 placeholder="Digite o conteúdo..."
                 onChange={(e) => setBody(e.target.value)}
                 value={body || ""}>
                 </textarea>
             </div>
              <input type="submit" value="Editar Post" className="btn" />
          </form>
        </div>
    )
}

export default NewPost;

