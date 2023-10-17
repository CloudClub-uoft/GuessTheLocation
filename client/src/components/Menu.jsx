import React from 'react';
import { Link } from 'react-router-dom';


const Menu = () => {


// For the actual website we'll make a call to the backend to get images dynamically
const dummy_posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5850083/pexels-photo-5850083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5117913/pexels-photo-5117913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5282269/pexels-photo-5282269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    
    {
      id: 4,
      title: "Lorem, ipsum.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa modi eligendi?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/1684885/pexels-photo-1684885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptate aspernatur veniam voluptatem dolorum illo.",
      img: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];


  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {dummy_posts.map( post => (
            <div className='post' key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu;