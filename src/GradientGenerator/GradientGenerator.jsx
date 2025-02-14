import {useState , useEffect} from 'react'
import "./GradientGenerator.css";

import randomColor from 'randomcolor';
function GradientGenerator() {
  const [color1,setColor1] = useState(randomColor());
  const [color2,setColor2] = useState(randomColor());
  const [angle,setAngle] = useState(randomNumber());
  const [gradientType, setgradientType] = useState("linear");
  function randomNumber(){
    return Math.floor(Math.random() * 361);
  }
  
  function updateColor1(event){
      setColor1(event.target.value);
  }
  function updateColor2(event){
      setColor2(event.target.value);
  }
  function updateAngle(event){
    setAngle(event.target.value);
  }

  const updateGradientType = (type) => {
    setgradientType(type);
  }
  const directedAngle = (value) => {
    setAngle(value);
  }
  useEffect(() => {
    let gradient;
    if (gradientType === "linear") {
      gradient = `linear-gradient(${angle}deg, ${color1} 30%, ${color2} 100%)`;
    } else if (gradientType === "radial") {
      gradient = `radial-gradient(circle at center, ${color1} 30%, ${color2} 100%)`;
    } else if (gradientType === "conic") {
      gradient = `conic-gradient(${color1} 30%, ${color2} 100%)`;
    }
    document.getElementById(`${gradientType}gradientDisplay`).style.background = gradient;
  }, [color1, color2, angle, gradientType]);
  return (
    <div>
    <div className='outer-container' >
      {gradientType === "linear" ? 
      (<div id="lineargradientDisplay"></div>) 
      : ""}
      {gradientType === "radial" ? 
      (<div id="radialgradientDisplay"></div>) 
      : ""}
      {gradientType === "conic" ? 
      (<div id="conicgradientDisplay"></div>) 
      : ""}
    {/* space */}
        <div className="selector-container" >
          <div className='selector-inner-container'>
          <h1>Styles</h1>
            <button id='style-buttons' onClick={() => updateGradientType('linear')}>Linear</button>
            <button id='style-buttons' onClick={() => updateGradientType('radial')}>Radial</button>
            <button id='style-buttons' onClick={() => updateGradientType('conic')}>Conic</button>
          <h1>Colors</h1>
            <div className="color-picker-container">  
                <div className='value-container'>
                  <input type="text" value={color1} className="color-value" onChange={updateColor1} />
                  <input type="color" value={color1} className="colorPicker" onChange={updateColor1} />
                </div>
                <div className="value-container">
                  <input type="text" value={color2} className="color-value" onChange={updateColor2} />
                  <input type="color" value={color2} className="colorPicker" onChange={updateColor2} />
                </div>
            </div>
            <button id='random-color-chooser' onClick={() =>{
              setColor1(randomColor());
              setColor2(randomColor());
            }}>Random colors</button>
            <h1>Angle</h1>
            <input type="number" value={angle} className='angle-value'
             onChange={updateAngle} min={0} max={360} step={1} />
             <div className='angle-button-container'>
              <button onClick={() => directedAngle(315)}>
                <i className="fa-solid fa-arrow-up rotate-up-left"></i>
              </button>
              <button onClick={() => directedAngle(360)}>
                <i className="fa-solid fa-arrow-up "></i>
              </button>
              <button onClick={() => directedAngle(45)}>
                <i className="fa-solid fa-arrow-up rotate-up-right"></i>
              </button>
              <button onClick={() => directedAngle(-90)}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button onClick={() => directedAngle()}>
                <i className="fa-regular fa-circle"></i>
              </button>
              <button onClick={() => directedAngle(90)}>
                <i className="fa-solid fa-arrow-right "></i>
              </button>
              <button onClick={() => directedAngle(-135)}>
                <i className="fa-solid fa-arrow-down rotate-left-down"></i>
              </button>
              <button onClick={() => directedAngle(180)}>
               <i className="fa-solid fa-arrow-down "></i>
              </button>
              <button onClick={() => directedAngle(135)}>
                <i className="fa-solid fa-arrow-down rotate-right-down "></i>
              </button>
             </div>
            

          </div>
        </div>
    </div>

    <div className="card">
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <div className="card__content">
        <pre>
          {gradientType === "linear" ? 
      (
      <code>
        <span style={{color:'lightblue'}}>background-image</span>
        : linear-gradient({angle}deg,
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color1}</span> 30%,
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color2}</span> 100%);
      </code>
      ) 
      : ""}
      {gradientType === "radial" ? 
      (
      <code>
        <span style={{color:'lightblue'}}>background-image</span>
        : radial-gradient( 
          <span style={{color:'#ffb375'}}> circle at </span>center,
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color1}</span> 30%,
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color2}</span> 100%);
      </code>
      ) 
      : ""}
      {gradientType === "conic" ? 
      (
      <code>
        <span style={{color:'lightblue'}}>background-image</span>
        : conic-gradient(
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color1}</span> 30%,
        <span style={{color:'#ffb375', textTransform: "uppercase"}}> {color2}</span> 100%);
      </code>
      ) 
      : ""}
          
        </pre>
        <button onClick={() => {
        try {
          navigator.clipboard.writeText(`background-image: linear-gradient(${angle}deg, ${color1} 10%, ${color2} 100%);`);
          alert("CSS code copied to clipboard!");
            } catch (error) {
              alert("Failed to copy CSS code to clipboard: " + error);
            }
          }
          }>Copy to Clipboard
        </button>
      </div>
      </div>
    </div>
  );
}

export default GradientGenerator