import React,{useContext,useState} from 'react';
import {dataContext} from './Contexpage';

import axios from 'axios'


import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


import ceres from '../images/cares.jpg';
import earth from '../images/earth.jpg';
import eris from '../images/eris.jpg';
import haumea from '../images/haumea.jpg';
import jupiter from '../images/jupiter.jpg';
import makemake from '../images/makemake.jpg';
import mars from '../images/mars.png';
import mercury from '../images/mercury.jpg';
import pluto from '../images/pluto.png';
import saturn from '../images/saturn.jpg';
import venus from '../images/venus.jpg';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'space-evenly',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
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

    const {newdata,setnewdata} = useContext(dataContext)

    const [planetDetails, setplanetDetails] = useState(null)
    const initialState = {
        ceres:ceres,
        earth:earth,
        eris:eris,
        haumea:haumea,
        jupiter:jupiter,
        makemake:makemake,
        mars:mars,
        mercury:mercury,
        pluto:pluto,
        saturn:saturn,
        venus:venus

    }
    const [imagesSet, setimagesSet] = useState(initialState)

    const classes = useStyles()
    React.useEffect(()=>{
        axios.get('https://assignment-machstatz.herokuapp.com/planet')
        .then(res=>
            // favoriteData.newdata.returnToHome ?
            // setplanetDetails(null):
            setplanetDetails(res.data)
            )
        .catch(err=>console.log(err))
    
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

   const handleFavirate =(id)=>{
    console.log("hhhh",id);

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
    if(planetDetails) {
        for (var property in imagesSet) {
            for(var eachItem of planetDetails){
                if(eachItem.id === property){
                    eachItem["image"] =imagesSet[property]
                }
            }
        }
    }

    if(favoriteData.newdata.favoriteStore.includes(id)){
        const newidStore = favoriteData.newdata.favoriteStore.filter(planet=>planet !== id)
        setfavirateClick({...favirateClick,idStore:newidStore})
        for (let each of favoriteData.newdata.planetStore){
            if(each.id===id && newidStore.includes(id)){
                each.isFavourite=true
            }
        }
    }
    else{
        setfavirateClick({...favirateClick,idStore:[...favirateClick.idStore,id]})  
    }
       
}

    const favoriteData = useContext(dataContext)
    console.log(favoriteData.newdata,"favoriteee");
    return (
        
            <div  className={classes.root}>
          

          {/* <Container maxWidth="md"> */}
              {/* <Grid item xs={6}> */}
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
                      <IconButton aria-label={`star ${tile.name}`}
                       onClick={()=>handleFavirate(tile.id)}
                        >
                      {tile.isFavourite && favoriteData.newdata.favoriteStore.includes(tile.id) ? 
                      <FavoriteIcon className={classes.title} /> :
                                      <FavoriteBorderIcon className={classes.title} />
                      }  

                      </IconButton>
                  }
                  />
                  </GridListTile>:null
              )): null}
          </GridList>
          {/* </Grid> */}
          {/* </Container> */}
          </div>
    )
}
