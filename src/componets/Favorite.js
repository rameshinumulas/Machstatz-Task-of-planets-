import React,{useContext,useState} from 'react';
import {dataContext} from './Contexpage';

import axios from 'axios'

import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import hello from '../images/hello.gif';
import seaching from '../images/seaching.gif';
import looking from '../images/looking.gif';
import galaxy from '../images/galaxy.jpg'


export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'space-evenly',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    //   backgroundImage: `url(${ galaxy })`,
    //   backgroundRepeat:'no-repeat',
      
    },
    root2:{
        marginTop:theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            marginTop:theme.spacing(13.5)
          },
        
    },

    gridList: {
      flexWrap: 'wrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.secondary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

  }));

export default function Favorite() {
    const [drawerActivate, setdrawerActivate] = useState(false)
    const [favirateClick, setfavirateClick] = useState({idStore:[],newSetdata:[]})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {newdata,setnewdata} = useContext(dataContext)

  

    const classes = useStyles()
    
    React.useEffect(()=>{
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
    setfavirateClick({...favirateClick,idStore:favoriteData.newdata.favoriteStore,newSetdata:favoriteData.newdata.planetStore})
    setnewdata({...newdata,returnToHome:favirateClick.idStore,returnToplanetData:favirateClick.newSetdata})

   },[])
   React.useEffect(()=>{
    setnewdata({...newdata,returnToHome:favirateClick.idStore,returnToplanetData:favirateClick.newSetdata})
},[favirateClick])

   const handleFavirate =(id,warning)=>{
    enqueueSnackbar('Removed from Favorite',{warning});

    if(favoriteData.newdata.favoriteStore.includes(id)){
        for (let each of favoriteData.newdata.planetStore){
            if(each.id===id){
                each.isFavourite=false
            }
        }
    }else{
        for (let each of favoriteData.newdata.planetStore){
            if(each.id===id){
                each.isFavourite=false
            }
        }
    }
   

    if(favoriteData.newdata.favoriteStore.includes(id)){
        const newidStore = favoriteData.newdata.favoriteStore.filter(planet=>planet !== id)
        setfavirateClick({...favirateClick,idStore:newidStore})

       
    }
    else{
        setfavirateClick({...favirateClick,idStore:[...favirateClick.idStore,id]})  .
        enqueueSnackbar('Added to Fivorite',{warning});

    }
       
}


    const favoriteData = useContext(dataContext)
    return (
        
            <div  className={classes.root}>
          

          {/* <Container maxWidth="md"> */}
              {/* <Grid item xs={6}> */}
              <div className={classes.root2}>
          <GridList className={classes.gridList} cellHeight={drawerActivate ? 180:350}  cols={drawerActivate ? 2:3}>
              {favoriteData.newdata.planetStore ? favoriteData.newdata.planetStore.map((tile) => (
                   tile.isFavourite && favoriteData.newdata.favoriteStore.includes(tile.id) ?
              <GridListTile key={tile.id} className="imagehover">
                  <img src={tile.image} alt={tile.id}  />
                  <GridListTileBar
                  title={tile.name}
                  classes={{
                      root: classes.titleBar,
                      title: classes.title,
                  }}
                  actionIcon={
                      <IconButton aria-label={`star ${tile.name}`} onClick={()=>handleFavirate(tile.id,"warning")}
                        >
                      {tile.isFavourite && favoriteData.newdata.favoriteStore.includes(tile.id) ? 
                      <FavoriteIcon className={classes.title} /> :null
                      }  

                      </IconButton>
                  }
                  />
                  </GridListTile>:null
              )): null}
                                    {/* <h3>you don't have favorite</h3> */}
            {favoriteData.newdata.favoriteStore.length>=1 ?
                null
            : <div>
                <img src={seaching} alt={seaching} /> 
             </div>}


          </GridList>
          </div>
          {/* </Grid> */}
          {/* </Container> */}
          </div>
    )
}
