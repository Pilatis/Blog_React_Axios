import blogFetch from "../../axios/config";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";//Usado para acessar os parâmetros da URL

import './Post.css'
import Loading from "../../components/Loading/Loading";

//refatoração
const Post = () => {
   const { id } = useParams();//ultiliza o hook `useParams` para obter o parametro id da url
   const [post, setPosts] = useState(null);//armazenar o post
   const [isLoading, setIsLoading] = useState(true);//carregamento da página

   const fetchPost = async () => {//função assíncrona fetchPost para buscar detalhes do post

    try {
      const response = await blogFetch.get(`/posts/${id}`);
      setPosts(response.data);//atualizando o estado post com os dados das responstas
      setIsLoading(false);//quando a operação é concluida fica false
    
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
   }

   useEffect(() => {//usa o hook para executar o fetchPost quando o componente é montado ou
    fetchPost();                                         //quando o id muda

   }, [id]); // id como dependência para garantir que o fetchPost seja chamado quando o id mudar



  return (
     <div className="post-container">
       {isLoading ? (//se for verdadeiro exibe o Loading
       <Loading />
       ) : (
        post && ( //verifica se o post existe antes de renderizar os detalhes do post
         <div className="post">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
         </div>
        )
       )}
     </div>
  )
}

export default Post;