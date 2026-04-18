import styles from "./AboutUsPage.module.css";

const crewMembers = [
  {
    id: 1,
    name: "Captain Sarah Vega",
    Title: "Astronaut",
    description:
      "A former NASA astronaut with over 15 years of experience, Captain Vega leads our missions with unparalleled expertise and a passion for space exploration.",
    image: "/crew/image-sarah-vega.png",
  },
  {
    id: 2,
    name: "Dr.Leo Redding",
    Title: "Chief astroPhysicist",
    description:
      "Dr. Redding is a renowned astrophysicist whose groundbreaking research on black holes and dark matter has earned him international acclaim.",
    image: "/crew/image-leo-redding.png",
  },
  {
    id: 3,
    name: " Mark Shuttleworth",
    Title: "Chief Engineer",
    description:
      "With his extensive background in aerospace engineering, He is responsible for the state-of-the-art technology that powers our spacecraft. Her innovation ensures that our travelers are always in safe hands.",
    image: "/crew/image-mark-shuttleworth.png",
  },
  {
    id: 4,
    name: "Alex Santos",
    Title: "Mission Specialist",
    description:
      " As a mission specialist, Alex’s job is to ensure that every aspect of the journey runs smoothly. With a background in both science and adventure tourism, Alex is the perfect guide for our space travelers.",
    image: "/crew/image-alex-santos.png",
  },
];

const OurCrew = () => {
  return (
    <section>
      <p>
        Our crew is the heart and soul of Galactica. We are a diverse team of
        seasoned space explorers, engineers, and visionaries who are united by a
        common goal: to make space travel accessible and exciting for all.
      </p>
      <div className={styles.crewGrid}>
        {crewMembers.map((member) => (
          <article key={member.id} className={styles.crewCard}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.crewImage}
            />
            <h3>{member.name}</h3>
            <h4>{member.Title}</h4>
            <p>{member.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OurCrew;
