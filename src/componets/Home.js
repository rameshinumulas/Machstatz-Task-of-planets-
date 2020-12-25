import React,{useState} from 'react'
import Planet from './Planet';
import { Button } from '@material-ui/core';
import Favorite from './Favorite';
import { dataContext } from './Contexpage';
import { Link, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import hello from '../images/hello.gif';



const useStyles = makeStyles((theme) => ({
    
    views:{
        // width:600,
        [theme.breakpoints.up('md')]: {
            width:1200
          },
       
        display: 'flex',
        justifyContent:'space-evenly',
        backgroundColor: 'lightskyblue',
        // marginTop:theme.spacing(20),
        alignItems: 'center',
        position: 'fixed',
        zIndex: 1,

    },
    afterWidth:{
        width:1200,
        display: 'flex',
        justifyContent:'space-evenly',
        backgroundColor: 'lightskyblue',
        // marginTop:theme.spacing(20),
        alignItems: 'center',
        position: 'fixed',
        zIndex: 1,
    }

  }));

export default function Home() {
    const classes = useStyles()
    const [drawerActivate, setdrawerActivate] = useState(false)

    const initialState={
        planetStore:[],
        favoriteStore:[],
        returnToHome:[],
        returnToplanetData:[]
    }
    React.useEffect(() => {
        if (window.innerWidth <= 600) {
            setdrawerActivate(true);
        }
 
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                setdrawerActivate(true);
            }
        
            else {
                setdrawerActivate(false);
            }
        });
    }, [drawerActivate])
 

    const [newdata, setnewdata] = useState(initialState)
    return (
        <dataContext.Provider value={{newdata,setnewdata}}>
        <div>
            <div className={drawerActivate ? classes.views:classes.afterWidth} >
            <Link to="/" style={{textDecoration:'none'}}><Button variant="contained" color={window.location.pathname==='/' ?"primary":"secondary"}>View all</Button>
            </Link>

                <h2>Machstatz Planets Gallery</h2>
                <Link to="/fav" style={{textDecoration:'none'}}> <Button variant="contained" color={window.location.pathname==='/fav' ?"primary":"secondary"}>
                View Favorite</Button>
                </Link>
            </div>
            {/* <div > */}
            <SnackbarProvider maxSnack={1}>
           
            <Route exact path="/" component={Planet} />
            <Route exact path="/fav" component={Favorite} />
            </SnackbarProvider>
            {/* </div> */}
        </div>
        </dataContext.Provider>
    )
}
