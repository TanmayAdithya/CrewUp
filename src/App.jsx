import ProjectStatusReport from "./components/ProjectStatusReport";

function App() {
  return (
    <>
      <div id="header">
        <nav id="navbar">
          {/* CrewUp Logo */}
          <img
            className="crewup-logo"
            src="https://i.postimg.cc/Ls7Tth4g/Crew-Up-Logo.png"
            alt="crewup-image"
          />
          <div>
            <a>
              <button className="btn about-project-btn">About</button>
            </a>
          </div>
        </nav>
      </div>
      <div id="hero-text">
        {/* Main Heading/Hero Text */}
        <h1 id="heading">
          Say goodbye to the frustrations of miscommunication and disorganized
          efforts.
        </h1>
      </div>
      <div>
        {/* Main Sub-heading */}
        <h3 id="sub-heading">
          Create detailed documentation and project reports for your project
          with ease.
        </h3>
      </div>
      <ProjectStatusReport />
    </>
  );
}

export default App;
