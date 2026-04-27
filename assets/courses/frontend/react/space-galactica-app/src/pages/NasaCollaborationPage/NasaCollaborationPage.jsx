import React, { useState, useEffect } from "react";
import styles from "./NasaCollaborationPage.module.css";

// Read "/app/nasa_collaboration/README.md" for more info about the API_KEY
// You need a proper API_KEY for the requests to work
const API_KEY = "WIq797DkI328Z1ZmTqrxcHetUfAz7g1TyB8zqHJp";
const currentDate = new Date().toISOString().split("T")[0];

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  marsRoverPhoto: `https://rovers.nebulum.one/api/v1/rovers/curiosity/photos?earth_date=${currentDate}&api_key=${API_KEY}`,
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState([]);
  const [isLoadingRoverPhotos, setIsLoadingRoverPhotos] = useState(true);
  const [roverError, setRoverError] = useState("");

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        setIsLoadingRoverPhotos(true);
        setRoverError("");

        const roverPhotoResponse = await fetch(NASA_URLs.marsRoverPhoto);
        const data = await roverPhotoResponse.json();

        setRoverPhoto(data.photos || []);
      } catch (error) {
        setRoverError("Failed to fetch rover photos. Please try again later.");
      } finally {
        setIsLoadingRoverPhotos(false);
      }
    };
    fetchRoverPhotos();

    // 🧑🏽‍🚀 Task - Week 3
    // Fetch the extra data for NASA_URLs.astronomyPicOfTheDay and save it to the dailyImg state variable.
    const fetchDailyImg = async () => {
      const dailyImgResponse = await fetch(NASA_URLs.astronomyPicOfTheDay).then(
        (response) => response.json(),
      );
      setDailyImg(dailyImgResponse);
      console.log(dailyImgResponse);
    };

    fetchDailyImg();
  }, []);

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Collaboration with NASA</h1>
        <section className="card">
          <h2>Astronomy Picture of the day</h2>
          <p>{dailyImg.title}</p>
          <img
            className={styles.nasaPicOfTheDayImg}
            src={dailyImg.url}
            alt={dailyImg.title}
          />
          <p>{dailyImg.explanation}</p>
        </section>
        <section className="card">
          <h2>Rover Photos</h2>
          <p>{currentDate}</p>
          {isLoadingRoverPhotos ? (
            <p>Loading rover photos...</p>
          ) : roverError ? (
            <p>{roverError}</p>
          ) : roverPhoto.length === 0 ? (
            <p>No rover photos available for {currentDate}.</p>
          ) : (
            roverPhoto.map((photo) => (
              <RoverPhoto
                key={photo.id}
                src={photo.img_src}
                date={photo.earth_date}
                roverName={photo.rover.name}
              />
            ))
          )}
          <>
            {/* 🧑🏽‍🚀 Task - Week 3 */}
            {/* Create a react component for the <RoverPhoto />, which should accept the following props: */}
            {/* 1. src: source of the img; */}
            {/* 2. date: earth_date data coming from the API; */}
            {/* 3. roverName: will be in the rover object. */}

            {/* If you don't know how the data looks like you can log it out to the console and investigate in the browser's devtools. */}
          </>
        </section>
      </main>
    </div>
  );
};

export default NasaCollaboration;
