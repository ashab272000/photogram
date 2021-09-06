import {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../actions'
import Header from '../../components/Header'
import { getPostByFollowingUsers, getPostsByTrending } from '../../data/postRequests'
import { auth } from '../../firebase'
import useWindowDimensions from '../../hooks/UseWindowDimension'
import firebase from 'firebase'
import './index.css'
import PostCard from './PostCard'

function HomeScreen({isTrending = false}) {
    
    const [posts, setPosts] = useState([]);
    const [numOfCards, setNumOfCards] = useState(5)
    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory()
    const [cookies, setCookie] = useCookies(['credential']);
    const dispatch = useDispatch();
    
    const { height, width } = useWindowDimensions();
    

    const getColumns = () => {
        // If there are posts, then render the posts
        // Else render a button to switch to trending
        if(posts.length > 0){
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
    }

    useEffect(async () => {

        if(authReducer.user == null && cookies.credential != null){
            const token = cookies.credential.oauthIdToken ?? cookies.credential.idToken
            const credential = await firebase.auth.GoogleAuthProvider.credential(token);
            auth.signInWithCredential(credential).then((result) => {
              setCookie('credential', result.credential)
              dispatch(signIn(result?.user))
              history.push('/');
            }).catch((error) => {
              console.log(error)
            })
        }
    }, [])

    useEffect(async () => {
        let tempPosts = []
        if(authReducer.user != null && !isTrending) {
            tempPosts = await getPostByFollowingUsers(authReducer.user?.uid);
        }else {
            tempPosts = await getPostsByTrending();
        }
        
        if(tempPosts.length == 0){
            history.push('/trending')
        }

        setPosts(tempPosts)
        
        
    }, [isTrending])

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
