import React, {useRef, useEffect,useState} from 'react';
import * as d3 from "d3";
import './Linechart.css'
import Slider from '../Slider/Slider'

const LineChart=()=>{
    const d3Chart=useRef()
    const [sliderValue,setSliderValue]=useState(30)
    const [tHpi,setSliderValue1]=useState(5000000)
    // const tHpi=5000000
    const callbackFunctionFlowTime=(childData)=>{
        setSliderValue(childData)
    }
    const callbackFunctionThpi=(childData)=>{
        console.log(childData)
        setSliderValue1(childData)
    }
  
    const data= [
        {year:1,increaseThroughput:0,roi:0,dsCost:5000000},
        {year:2,increaseThroughput:0,roi:0,dsCost:2000000},
        {year:3,increaseThroughput:0,roi:0,dsCost:1000000},
        {year:4,increaseThroughput:0,roi:0,dsCost:500000},
        {year:5,increaseThroughput:0,roi:0,dsCost:125000},
        
    ]
    data.map((data,i)=>{
        const flowTime=(sliderValue-((sliderValue*.93)*Math.pow(.744,(5-i))))
        return data.increaseThroughput=(((365/flowTime)-(365/sliderValue))*tHpi),
                data.roi=data.increaseThroughput/data.dsCost
    
    })
    
    useEffect(()=>{
     d3.selectAll('g').remove()
        console.log(data)
    const margin={top:20,right:30,bottom:50,left:100}
    const width=parseInt(d3.select('#d3demo').style('width'))- margin.left - margin.right
    const height=parseInt(d3.select('#d3demo').style('height')) -margin.bottom -margin.top

    // SET UP CHART
    const svg=d3.select(d3Chart.current)
                .attr("viewBox", `0 0 ${width} ${height}`)
                .style('background-color','transparent')
                .append('g')
                .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');
    // X AXIS SCALE
    const x = d3.scaleLinear()
        .domain([1,5])
        .range([0,width*.7])

    svg.append("g")
        .attr('class','x-axis')
        .attr("transform", `translate(0, ${height*.90})`)
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    
    // GET MAX VALUE OF COUNT
    const maxYOne=d3.max(data,(d)=>{return d.increaseThroughput})
   
    // Y AXIS SCALE
    const y1=d3.scaleLinear()
                .domain([0,maxYOne])
                .range([height*.9,0])
    svg.append('g')
        .attr('class','y-axis')
        .call(d3.axisLeft(y1).ticks(5))

    const maxYTwo=d3.max(data,(d)=>{return d.roi})
   
        // Y AXIS SCALE
    const y2=d3.scaleLinear()
                    .domain([0,maxYTwo])
                    .range([height*.9,0])
    svg.append('g')
            .attr('class','y-axis')
            .attr("transform", `translate(${width*.7},0)`)
            .call(d3.axisRight(y2).ticks(5))
    

    // // DRAW LINE

    svg.append('path')
    .attr("class", "line")
        .data([data])
        .attr('fill','none')
        .attr('stroke','#2a9d8f')
        .attr('stroke-width',4)
        .attr('d',d3.line()
                    .x((d)=>{return x(d.year)})
                    .y((d)=>{return y1(d.increaseThroughput)})
               

        )
    svg.append('path')
        .attr("class", "line")
            .data([data])
            .attr('fill','none')
            .attr('stroke','#9d2a69')
            .attr('stroke-width',4)
            .attr('d',d3.line()
                        .x((d)=>{return x(d.year)})
                        .y((d)=>{return y2(d.roi)})
                   
    
            )
})


    return(
        <>
        <div id="d3demo">
            <svg ref={d3Chart}>
            </svg>
        </div>
        <Slider parentCallbackFlowTime={callbackFunctionFlowTime} parentCallbackTHpi={callbackFunctionThpi}/>
     
    </>
    )
}

export default LineChart;