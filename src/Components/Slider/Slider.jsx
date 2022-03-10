import React, {useRef, useEffect} from 'react';
import * as d3 from "d3";
import './Slider.css'
import ReactSlider from 'react-slider';

const Slider=(props)=>{
    const sendFlowTime = (a) => {
        props.parentCallbackFlowTime(a);
        // console.log("props",props)
    }
    const sendTHpi = (a) => {
        props.parentCallbackTHpi(a);
        // console.log("props",props)
    }

    return(
        <>
        <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        onChange={sendFlowTime}
        defaultValue={30}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>
        }
        />
        <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        onChange={sendTHpi}
        max={999999999} 
        // step={10} 
        min={1}
        defaultValue={5000000}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>
        }
        />
   
    </>
    )


}

export default Slider;