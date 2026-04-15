import styles from "./AboutUsPage.module.css";

// 🧑🏽‍🚀 Task - Week 1
// After you are finished with creating the page, move the OurValues, OurCrew, OurPartners components into their own files in this folder.
// Import and use the components from the newly created files.
const values = [
  {
    number: "01",
    title: "Exploration",
    description:
      "We are driven by a deep-seated desire to explore the unknown. We believe that the pursuit of discovery is at the heart of human nature, and we are committed to pushing the boundaries of what is possible.",
  },
  {
    number: "02",
    title: "Innovation",
    description:
      "At Galactica, we prioritize cutting-edge technology and innovation. We are constantly evolving our spacecraft, safety protocols, and services to ensure that our travelers experience the most advanced and secure space journeys available.",
  },
  {
    number: "03",
    title: "Sustainability",
    description:
      "We are committed to making space exploration sustainable for future generations. Our space missions are designed to minimize environmental impact, both on Earth and in space, and to foster a spirit of responsibility towards our universe.",
  },
  {
    number: "04",
    title: "Community",
    description:
      "We believe in the power of collective exploration. Our journeys are not just about reaching new destinations; they are about building a community of space enthusiasts who share a passion for the stars.",
  },
];

const OurValues = () => {
  return (
    <div className="our-values">
      <div className={styles["values-container"]}>
        {values.map((value) => (
          <div key={value.number} className="card">
            <h1>{value.number}</h1>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

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

const partners = [
  {
    id: 1,
    image: "/business_partners/amazon_logo.png",
  },
  {
    id: 2,
    image: "/business_partners/CBC_Logo_White.png",
  },

  {
    id: 3,
    image: "/business_partners/nyu-logo.png",
  },
  {
    id: 4,
    image: "/business_partners/QueensLogo_white.png",
  },
  {
    id: 5,
    image: "/business_partners/samsung-logo.png",
  },
  {
    id: 6,
    image: "/business_partners/sodexo-logo.png",
  },
];

const OurPartners = () => {
  return (
    <section>
      <p>
        We collaborate with some of the most respected names in the space and
        technology industries to make every journey extraordinary.
      </p>
      <div className={styles.partnersGrid}>
        {partners.map((partner) => (
          <img
            key={partner.id}
            src={partner.image}
            alt={`Partner ${partner.id}`}
            className={styles.partnerLogo}
          />
        ))}
      </div>
    </section>
  );
};

export const Crew = () => {
  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>About us</h1>
        <section className="card">
          <h2>Our Values</h2>
          <OurValues />
        </section>
        <section className="card">
          <h2>The crew</h2>
          <OurCrew />
        </section>
        <section className="card">
          <h2>Our Partners</h2>
          <OurPartners />
        </section>
      </main>
    </div>
  );
};

export default Crew;
