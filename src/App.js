import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useEffect, useState} from 'react';
import PanelHeading from './components/PanelHeading';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies]= useState([]);
  const [searchTerm, setSearchTerm]= useState(''); 
  const [favourites, setFavourites] = useState([]);

    const getMovieRequest =async ()=>{
        const url =`http://www.omdbapi.com/?s=${searchTerm}&apikey=8e5efd8d`;

        const response = await fetch(url);
        const responseJson = await response.json();
        
        if(responseJson.Search)
        {
            setMovies(responseJson.Search);
        }
        
    };

    useEffect(()=>{
        getMovieRequest(searchTerm);
    },[searchTerm]);

    const addFavourite =(movie)=>{
      const newFavouriteList =[...favourites, movie];
      setFavourites(newFavouriteList);
    };

    const removeFavouriteMovie =(movie)=>{
      console.log("old fav list-->");
      console.log(favourites);
      const newfavs=[];
      for(let i=0;i<favourites.length;i++){
        console.log("in loop now");
        console.log("working on "+JSON.stringify(favourites[i]));
        if(favourites[i]!=movie)
          newfavs[i]=favourites[i];
      }
        console.log("new fav list-->");
        console.log(newfavs);
        setFavourites(newfavs);
    };


  return (
    <div className='container-fluid  movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
        <PanelHeading heading='Movies' />
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <div className='row'>
        
        <MovieList
        movies={movies} 
        handleFavouritesClick={addFavourite} 
        favouriteComponent={AddFavourites} 
        />
       
        
     </div >

    { 
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <PanelHeading heading='Favourites' />
      </div> 
    }
    { 
      <div className='row'>
        
        <MovieList 
        movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie} 
        favouriteComponent={RemoveFavourites} 
        />
       
      </div> 
    }
     </div>
  );
};

export default App;
