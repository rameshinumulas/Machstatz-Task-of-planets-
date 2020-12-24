import React,{useState} from 'react'
import Planet from './Planet';
import { Button } from '@material-ui/core';
import Favorite from './Favorite';
import { dataContext } from './Contexpage';
import { Link, Route } from 'react-router-dom';



export default function Home() {

    const initialState={
        planetStore:[],
        favoriteStore:[],
        returnToHome:[],
        returnToplanetData:[]
    }
    const [newdata, setnewdata] = useState(initialState)
    return (
        <dataContext.Provider value={{newdata,setnewdata}}>
        <div>
            <div className="views">
            <Link to="/"><Button variant="contained" color="secondary">View all</Button>
            </Link>

                <h2>Task for machstatz</h2>
                <Link to="/fav"> <Button variant="contained" color="secondary">
                View Favorite</Button>
                </Link>
            </div>
           
            <Route exact path="/" component={Planet} />
            <Route exact path="/fav" component={Favorite} />
        </div>
        </dataContext.Provider>
    )
}
