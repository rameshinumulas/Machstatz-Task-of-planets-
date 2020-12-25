import { BrowserRouter } from 'react-router-dom';






import React,{useState} from 'react'
import Planet from './componets/Planet';
import { Button } from '@material-ui/core';
import Favorite from './componets/Favorite';
import { dataContext } from './componets/Contexpage';
import { Link, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';




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

export default function App() {
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
    <BrowserRouter>
    <div className="App">
        <dataContext.Provider value={{newdata,setnewdata}}>
        <div>
            <div className={drawerActivate ? classes.views:classes.afterWidth} >
            <Link to="/Machstatz-Task-of-planets-" style={{textDecoration:'none'}}><Button variant="contained" color={window.location.pathname==='/Machstatz-Task-of-planets-' ?"primary":"secondary"}>View all</Button>
            </Link>

                <h2>Machstatz Planets Gallery</h2>
                <Link to="/Machstatz-Task-of-planets/fav" style={{textDecoration:'none'}}> <Button variant="contained" color={window.location.pathname==='/Machstatz-Task-of-planets/fav' ?"primary":"secondary"}>
                View Favorite</Button>
                </Link>
            </div>
            {/* <div > */}
            <SnackbarProvider maxSnack={1}>
           
            <Route exact path="/Machstatz-Task-of-planets-" component={Planet} />
            <Route exact path="/Machstatz-Task-of-planets/fav" component={Favorite} />
            </SnackbarProvider>
            {/* </div> */}
        </div>

        </dataContext.Provider>
        </div>
        </BrowserRouter>
    )
}
