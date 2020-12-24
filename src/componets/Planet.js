import axios from 'axios'
import React from 'react'
import {dataContext} from './Contexpage'

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

//importing images from image file
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


// importing useEffect hook , useState, useContext
const {useState, useEffect,useContext } = React


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
  

const Planet = ()=> {
    const favoriteData = useContext(dataContext)

    const classes = useStyles()
    const {newdata,setnewdata} = useContext(dataContext)
    // console.log(newdata,"cccc",favoriteData.newdata.planetStore);

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
    const [drawerActivate, setdrawerActivate] = useState(false)
    const [imagesSet, setimagesSet] = useState(initialState)
    const [favirateClick, setfavirateClick] = useState({idStore:[],returnPlanet:[]})


    //Doing API requests using axios third party module 
    useEffect(()=>{
        // console.log(favoriteData.newdata.planetStore,"u");
         axios.get('https://assignment-machstatz.herokuapp.com/planet')
        .then(res=>
            favoriteData.newdata.planetStore.length >=1 ?
            // setplanetDetails(null):
            setplanetDetails(favoriteData.newdata.planetStore):setplanetDetails(res.data)
            )
        .catch(err=>console.log(err))



        if (window.innerWidth <= 600) {
            console.log(window.innerWidth);
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
        setfavirateClick({...favirateClick,idStore:favoriteData.newdata.returnToHome,
            returnPlanet:favoriteData.newdata.returnToplanetData})
        if(favoriteData.newdata.planetStore.length>=1){
            setplanetDetails(favoriteData.newdata.planetStore)
        }
        console.log(planetDetails,favoriteData.newdata.planetStore,"eeeee");
        // setnewdata({...newdata,planetStore:favoriteData.newdata.returnToplanetData,favoriteStore:favirateClick.idStore})

    },[])
    // console.log(planetDetails,"o");

    useEffect(()=>{
        setnewdata({...newdata,favoriteStore:favirateClick.idStore,planetStore:planetDetails})
        if(favirateClick.returnPlanet.length>=1){
            setnewdata({...newdata,planetStore:favirateClick.returnPlanet,favoriteStore:favirateClick.idStore})
        }
    },[favirateClick])
  
    if(planetDetails) {
        for (var property in imagesSet) {
            for(var eachItem of planetDetails){
                if(eachItem.id === property){
                    eachItem["image"] =imagesSet[property]
                }
            }
        }
    }

    const handleFavirate =(id)=>{
        console.log(planetDetails,"hhhh",id);

        for (let each of planetDetails){
            // if(each.id===id){
                if(each.isFavourite !== true){
                    if(each.id === id){
                        each.isFavourite=true
                    }
                }
            // }
        }

        setplanetDetails(planetDetails)
        if(favirateClick.idStore.includes(id)){
            const newidStore = favirateClick.idStore.filter(planet=>planet !== id)
            setfavirateClick({...favirateClick,idStore:newidStore})
            for (let each of planetDetails){
                if(each.id===id && !newidStore.includes(id)){
                    each.isFavourite=false
                }
            }
        }
        else{
            setfavirateClick({...favirateClick,idStore:[...favirateClick.idStore,id]})  
        }
           setnewdata({...newdata,planetStore:favirateClick.returnPlanet})
        console.log(favirateClick,planetDetails,"second")
    }
    // console.log(planetDetails)
    // console.log(favirateClick,"f",planetDetails)

// saloni@iesl.co
    return (
        <div  className={classes.root}>

        {/* <Container maxWidth="md"> */}
            {/* <Grid item xs={6}> */}
        <GridList className={classes.gridList} cellHeight={drawerActivate ? 180:350}  cols={drawerActivate ? 2:3}>
            {planetDetails ? planetDetails.map((tile) => (
            <GridListTile key={tile.id} className="imagehover">
                <img src={tile.image} alt={tile.id}  />
                <GridListTileBar
                title={tile.name}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                actionIcon={
                    <IconButton aria-label={`star ${tile.name}`} onClick={()=>handleFavirate(tile.id)} >

                    {favoriteData.newdata.returnToHome ? 
                    favoriteData.newdata.returnToHome.includes(tile.id) ? <FavoriteIcon className={classes.title} />:
                    
                    tile.isFavourite && favirateClick.idStore.includes(tile.id) ? 
                    <FavoriteIcon className={classes.title} /> :
                    <FavoriteBorderIcon className={classes.title} />
                    : tile.isFavourite && favirateClick.idStore.includes(tile.id) ? 
                    <FavoriteIcon className={classes.title} /> :
                    <FavoriteBorderIcon className={classes.title} />
                }   
                    </IconButton>
                }
                />
                </GridListTile>
            )):null}
        </GridList>
        {/* </Grid> */}
        {/* </Container> */}
        </div>
    )
}

export default Planet;