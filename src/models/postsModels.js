import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
//Conecta ao banco de dados utilizando a string de conexao fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//Funcao assincrona para buscar todos os posts dentro do banco de dados
export async function getTodosPosts(){
    //Selecionado o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    //Seleciona a colecao "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    //Retorna um array com todos os documentos da colecao
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

