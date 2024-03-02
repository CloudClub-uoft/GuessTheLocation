import axios from 'axios';
import HomePostCard from '../components/HomePostCard';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import style from '../style.scss';


const CommunityPosts = () =>{
    const dummy_posts = [
        {
            username: 'tester111',
            date: '10/12/2111'
        },
        {
            username: 'tester222',
            date: "10/12/2111"
        },
        {
            username: 'tester333',
            date: "10/12/2111"
        },
        {
            username: 'tester434',
            date: "10/12/2111"
        },
        {
            username: 'tester323',
            date: "10/12/2111"
        },
        {
            username: 'tester313',
            date: "10/12/2111"
        }
    ]

    return (
        <div className='community-posts'>
            <div className='text-wrapper'>
                <h2 className='page-title'> COMMUNITY </h2>
                <p>Recent posts taken by real people!</p>
            </div>
            <div className='posts-wrapper'>
                {dummy_posts.map(post => (
                    <HomePostCard
                        username = {post.username}
                        date = {post.date}
                        className='postcard-1'
                        key='postcard-1'
                    />
                ))}
            </div>
        </div>
    )
}
export default CommunityPosts;