import axios from 'axios'
import React from 'react'
import {dataContext} from './Contexpage'

import {followCursor} from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

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

import { useSnackbar } from 'notistack';


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
    nameTitle:{
      color: theme.palette.grey.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0) 100%)',
    },

  }));
  

const Planet = ()=> {
    const favoriteData = useContext(dataContext)

    const classes = useStyles()
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
    const [drawerActivate, setdrawerActivate] = useState(false)
    const [imagesSet, setimagesSet] = useState(initialState)
    const [favirateClick, setfavirateClick] = useState({idStore:[],returnPlanet:[]})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    //Doing API requests using axios third party module 
    useEffect(()=>{
        setfavirateClick({...favirateClick,idStore:favoriteData.newdata.returnToHome})
         axios.get('https://assignment-machstatz.herokuapp.com/planet')
        .then(res=>
            favoriteData.newdata.planetStore.length >=1 ?
            // setplanetDetails(null):
            setplanetDetails(favoriteData.newdata.planetStore):setplanetDetails(res.data)
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
        setfavirateClick({...favirateClick,idStore:favoriteData.newdata.returnToHome,
            returnPlanet:favoriteData.newdata.returnToplanetData})
        if(favoriteData.newdata.planetStore===null || favoriteData.newdata.planetStore.length >=1 ){
            setplanetDetails(favoriteData.newdata.planetStore)
        }
        // setnewdata({...newdata,planetStore:favoriteData.newdata.returnToplanetData,favoriteStore:favirateClick.idStore})

    },[])

    useEffect(()=>{
        setnewdata({...newdata,favoriteStore:favirateClick.idStore,planetStore:planetDetails})
        if(favoriteData.newdata.planetStore===null || favirateClick.returnPlanet.length>=1){
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

    const handleFavirate =(id,variant)=>{

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
            enqueueSnackbar('Removed from the Favorite', {variant} );
            // for (let each of planetDetails){
            //     if(each.id===id && !newidStore.includes(id)){
            //         each.isFavourite=false
            //     }
            // }
        }
        else{
            setfavirateClick({...favirateClick,idStore:[...favirateClick.idStore,id]})  
            enqueueSnackbar('Added to the Fivorite',{ variant });
        }
           setnewdata({...newdata,planetStore:favirateClick.returnPlanet})
    }
    

    return (
        <div  className={classes.root}>

        {/* <Container maxWidth="md"> */}
            {/* <Grid item xs={6}> */}
            <div className={classes.root2}>
        <GridList className={classes.gridList} cellHeight={drawerActivate ? 180:350}  cols={drawerActivate ? 2:3}>
            {planetDetails ? planetDetails.map((tile) => (
            <GridListTile key={tile.id} className="imagehover">
                <img src={tile.image} alt={tile.id}  />
                <GridListTileBar
                title={tile.name}
                classes={{
                    root: classes.titleBar,
                    title: classes.nameTitle,
                }}
                actionIcon={
                    <Tippy
                        content={<span style={{color:"#FF007F"}} >Favorite</span>}
                        arrow={true}
                        animation="fade"
                        duration={0}
                        delay={[100, 0]}
                        followCursor={true} plugins={[followCursor]}
                        // ...and many more!
                        >
                    <IconButton aria-label={`star ${tile.name}`} onClick={()=>handleFavirate(tile.id,"success")} >

                    {/* {favoriteData.newdata.returnToHome ? 
                    favoriteData.newdata.returnToHome.includes(tile.id) ? 
                    <FavoriteIcon className={classes.title} /> 
                    :<FavoriteBorderIcon className={classes.title} />:null
                    }    */}
                    {tile.isFavourite && favirateClick.idStore.includes(tile.id) ? 

                    <FavoriteIcon className={classes.title} /> : <FavoriteBorderIcon className={classes.title} />}
                    </IconButton>
                    </Tippy>

                }
                />
                </GridListTile>
            )):null}
        </GridList>
        {/* </Grid> */}
        {/* </Container> */}
        </div>
        </div>
    )
}

export default Planet;