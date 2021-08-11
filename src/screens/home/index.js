import React, {useEffect, useState} from 'react'
import Header from '../../components/Header'
import { getAllPosts } from '../../data/postRequests'
import db from '../../firebase'
import useWindowDimensions from '../../hooks/UseWindowDimension'
import './index.css'
import PostCard from './PostCard'

function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [numOfCards, setNumOfCards] = useState(5)
    
    const { height, width } = useWindowDimensions();
    

    const getColumns = () => {
        const bodyColumns = []; 
        for (let i = 0; i < numOfCards; i++) {
            const postsInColumns = [];
            for (let j = i; j < posts.length; j+= numOfCards) {
                
                const post = posts[j];
                postsInColumns.push(<PostCard key={post._id} id={post._id} post={post} />);
            }
            bodyColumns.push(
            <div className="homeScreen__bodyColumn" key={i}> 
                {postsInColumns}
            </div>);
        }

        return bodyColumns;
    }

    useEffect(async () => {
       const posts = await getAllPosts();
       if(posts != null) {
           setPosts(posts)
       }
        
    }, [])

    useEffect(() => {
        let bodyPadding = 20 * 2;
        let cardWidth = 300;
        let cardMargin = 20
        let totalCardWidth = cardWidth + cardMargin * 2;
        let cardSet = numOfCards;
        for(let i = numOfCards; i > 0; i --){
            let calcSpace = bodyPadding + totalCardWidth *  i + 10;
            if (width > calcSpace){
                cardSet = i;
                break
            }
        }

        if(cardSet == numOfCards){
            let i = cardSet + 1;
            while(true) {
                let calcSpace = bodyPadding + totalCardWidth *  i + 10;
                if (width > calcSpace){
                    cardSet = i;
                } else {
                    break;
                }
                i = i +1;
            }
        }

        setNumOfCards(cardSet);
        console.log(numOfCards);
    }, [width])

    return (
        <div className="homeScreen">
            <Header />
            <div className="homeScreen__body">
                {getColumns()}
            </div>


        </div>
    )
}

export default HomeScreen
