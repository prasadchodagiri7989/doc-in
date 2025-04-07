import { Question } from "@/types";
import axios from 'axios';

let questions = [];

export async function postQuestion(question: Question) {
    await axios.post(`http://localhost:5000/api/v1/posts/createPost`, question);
}

export async function getQuestions() {
    const response = await axios.get(`http://localhost:5000/api/v1/posts/getAllPosts`);
    questions = response.data;
    return response.data;
}

export async function postAnswer(answer){
    await axios.post(`http://localhost:5000/api/v1/posts/postAnswer`, answer);
}

export async function getQuestionDetails(id){
    const response = await axios.get(`http://localhost:5000/api/v1/posts/getQuestionDetails/${id}`);
    return response.data;
}