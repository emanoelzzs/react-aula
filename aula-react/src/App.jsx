import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export default function App() {

  //Estados de autenticação
  const [ user, setUser ] = useState(null);
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  
  //Estados da tarefa
  const [ tarefas, setTarefas ] = useState([]);
  const [ titulo, setTitulo ] = useState('');
  const [ descricao, setDescricao ] = useState('');

  useEffect(function(){
  
      async function carregarsessao(){
        const resposta = await supabase.auth.getSession();
        const sessao = resposta.data.session;

        if(sessao){
          setUser(sessao.user);
        }  else {
          setUser(null);
        }        
      }
      carregarsessao();
      
      const listener = supabase.auth.onAuthStateChange(
        function(evento, sessao){
          if(sessao){
            setUser(sessao.user);
          } else {
            setUser(null); 
          }
        }
      )
      return function(){
        listener.data.subscription.unsubscribe();
      }
  }, []);

  useEffect(function(){
    if(user){
      buscarTarefas()
    }else {
      setTarefas([])
    }   
  }, [user])

async function cadastrar(){
  const resposta = await supabase.auth.singUp(
    {
      email: email,
      password: senha,
    }
  );
  if(resposta.error){
    alert('erro ao cadastrar: ' + resposta.error.message);
  } else {
    alert('sobrou algo para o beta, ai meu cuzinho');
  }
}
  async function login(){
    const resposta = await supabase.auth.singInWithPassoword(
      {
        email: email,
        password: senha,
      }
    );

  }
  async function logout() {
    await supabase.auth.singOut()
    
  }

  if(!user){
    return (
      <div>botou todo e eu me caguei</div>
    )
  }
  return (
    <div>deu tudo</div>
  )
}