import React, { useState, useEffect } from "react";
import styles from "./NasaCollaborationPage.module.css";
import RoverPhoto from "../../components/RoverPhoto";

// Read "/app/nasa_collaboration/README.md" for more info about the API_KEY
// You need a proper API_KEY for the requests to work
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const latestDate = yesterday.toISOString().split("T")[0];
const MAX_ROVER_PHOTOS = 1;

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  marsRoverPhoto: `https://rovers.nebulum.one/api/v1/rovers/curiosity/photos?earth_date=${latestDate}&api_key=${API_KEY}`,
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState([]);
  const [isLoadingRoverPhotos, setIsLoadingRoverPhotos] = useState(true);
  const [roverError, setRoverError] = useState("");
  const [isLoadingDailyImg, setIsLoadingDailyImg] = useState(true);
  const [dailyImgError, setDailyImgError] = useState("");

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        setIsLoadingRoverPhotos(true);
        setRoverError("");

        const roverPhotoResponse = await fetch(NASA_URLs.marsRoverPhoto);
        const data = await roverPhotoResponse.json();

        setRoverPhoto(data.photos.slice(0, MAX_ROVER_PHOTOS) || []);
      } catch (error) {
        setRoverError("Failed to fetch rover photos. Please try again later.");
      } finally {
        setIsLoadingRoverPhotos(false);
      }
    };
    fetchRoverPhotos();

    const fetchDailyImg = async () => {
      try {
        setIsLoadingDailyImg(true);
        setDailyImgError("");

        const dailyImgResponse = await fetch(NASA_URLs.astronomyPicOfTheDay).then(
          (response) => response.json(),
        );
        setDailyImg(dailyImgResponse);
      } catch (error) {
        setDailyImgError("Failed to fetch astronomy picture. Please try again later.");
      } finally {
        setIsLoadingDailyImg(false);
      }
    };

    fetchDailyImg();
  }, []);

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1 className={styles.pageTitle}>Collaboration with NASA</h1>

        <section className={`card ${styles.nasaCard}`}>
          <h2 className={styles.sectionTitle}>Astronomy Picture of the day</h2>

          {isLoadingDailyImg ? (
            <p className={styles.statusText}>Loading astronomy picture...</p>
          ) : dailyImgError ? (
            <p className={styles.errorText}>{dailyImgError}</p>
          ) : (
            <>
              <p className={styles.mediaTitle}>{dailyImg.title}</p>

              <div className={styles.apodFrame}>
                {dailyImg.media_type === "image" ? (
                  <img
                    className={styles.nasaPicOfTheDayImg}
                    src={dailyImg.url}
                    alt={dailyImg.title}
                  />
                ) : dailyImg.media_type === "video" ? (
                  <iframe
                    className={styles.apodVideo}
                    src={dailyImg.url}
                    title={dailyImg.title}
                    allow="fullscreen"
                  />
                ) : (
                  <p className={styles.statusText}>
                    Today&apos;s NASA media is not an image.
                  </p>
                )}
              </div>

              <p className={styles.apodDescription}>{dailyImg.explanation}</p>
            </>
          )}
        </section>

        <section className={`card ${styles.nasaCard}`}>
          <h2 className={styles.sectionTitle}>Rover Photos</h2>
          <p className={styles.dateBadge}>{latestDate}</p>

          {isLoadingRoverPhotos ? (
            <p className={styles.statusText}>Loading rover photos...</p>
          ) : roverError ? (
            <p className={styles.errorText}>{roverError}</p>
          ) : roverPhoto.length === 0 ? (
            <p className={styles.statusText}>
              No rover photos available for {latestDate}.
            </p>
          ) : (
            <RoverPhoto
              src={roverPhoto[0]?.img_src}
              date={roverPhoto[0]?.earth_date}
              roverName={roverPhoto[0]?.rover?.name}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default NasaCollaboration;
