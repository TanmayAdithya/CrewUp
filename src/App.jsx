import { useState } from "react";
import ProjectStatusReport from "./components/ProjectStatusReport";

function App() {
  const [component, setComponent] = useState(null);

  const LoadComponent = async (location) => {
    const { default: component } = await import(
      `../src/components/${location}`
    );
    setComponent(component);
  };

  return (
    <>
      <div id="header">
        <nav id="navbar">
          {/* CrewUp Logo */}
          <img
            className="crewup-logo"
            src="https://i.postimg.cc/BvfYC2wn/Crew-Up-logo-updated.png"
            alt="crewup-image"
          />
          <div>
            <a>
              <button className="btn">About</button>
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
        <h3 className="sub-heading">
          Create detailed documentation and project reports for your project
          with ease.
        </h3>
        <h4 className="sub-heading">What would you like to create?</h4>
      </div>
      <div>
        <div className="choose-form">
          <button
            className="btn"
            onClick={() => LoadComponent("ProjectStatusReport")}
          >
            Status Report
          </button>
          <button
            className="btn"
            onClick={() => LoadComponent("ProjectDocumentation")}
          >
            Documentation
          </button>
          {component}
        </div>
      </div>
      <ProjectStatusReport />
    </>
  );
}

export default App;
