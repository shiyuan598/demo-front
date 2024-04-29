import React, {useState} from 'react';
import { useParams } from 'react-router-dom';


export default function Detail() {

    const { id } = useParams(); 
    const [comment, setComment] = useState("");

    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
    .then(response => response.json())
    .then(json => setComment(json))

  return (
    <>
        <div>detail</div>
        <p>{JSON.stringify(comment)}</p>
    </>

  )
}
