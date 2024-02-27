import React, { useState } from 'react'
import ReactPlayer from "react-player";
import YouTube from "react-youtube";


const TrailerVideoPanel = ( { trailerUrlId}) => {
    

    const opts = {
        height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
      }
  return (
    <>
    {trailerUrlId && <YouTube videoId={trailerUrlId} opts={opts}/>}
    
    {/* <ReactPlayer
          url="https://www.youtube.com/watch?v=Dune:+Part+Two"
          controls={true}
          type="video/mp4"
          muted={true}
          playing={false}
        /> */}
        
    </>
  )
}

export default TrailerVideoPanel