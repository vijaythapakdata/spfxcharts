import * as React from 'react';
// import styles from './DataVisualization.module.scss';
import type { IDataVisualizationProps } from './IDataVisualizationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {sp,Web} from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";

import { ChartControl,ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

const DataVisualization:React.FC<IDataVisualizationProps>=(props)=>{

  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    })
  },[props.context]);

 

  //load bar chart 
  const loadBarChart=React.useCallback(async():Promise<Chart.ChartData>=>{
    const web=Web(props.siteurl);
const items=await web.lists.getByTitle(props.ListName).items.select("Title","Sales").get();
return{
  labels:items.map(i=>i.Title),
  datasets:[{
    label:"Sales",
    data:items.map(i=>i.Sales),
    backgroundColor:["#36A2EB","#FF6384","#FFCE56","#4BC0C0"]
  }]
}
  },[props.ListName])
  //Pie Chart
  const loadPieChart=React.useCallback(async():Promise<Chart.ChartData>=>{
      const web=Web(props.siteurl);
const items=await web.lists.getByTitle(props.ListName).items.select("Title","Sales").get();
return{
  labels:items.map(i=>i.Title),
  datasets:[{
    label:"Sales",
    data:items.map(i=>i.Sales),
    backgroundColor:["#36A2EB","#FF6384","#FFCE56","#4BC0C0"]
  }]
}
  },[props.ListName])

  //Donut Chart
  const loadDougnutChart=React.useCallback(async():Promise<Chart.ChartData>=>{
      const web=Web(props.siteurl);
const items=await web.lists.getByTitle(props.ListName).items.select("Title","Sales").get();
return{
  labels:items.map(i=>i.Title),
  datasets:[{
    label:"Sales",
    data:items.map(i=>i.Sales),
    backgroundColor:["#36A2EB","#FF6384","#FFCE56","#4BC0C0"]
  }]
}
  },[props.ListName]);
  const loadLineChart=React.useCallback(async():Promise<Chart.ChartData>=>{
      const web=Web(props.siteurl);
const items=await web.lists.getByTitle(props.ListName).items.select("Title","Revenue").get();
return{
  labels:items.map(i=>i.Title),
  datasets:[{
    label:"Revenue",
    data:items.map(i=>i.Revenue),
    backgroundColor:["#36A2EB","#FF6384","#FFCE56","#4BC0C0"]
  }]
}
  },[props.ListName])

   const loadBubbleChart=React.useCallback(async():Promise<Chart.ChartData>=>{
      const web=Web(props.siteurl);
const items=await web.lists.getByTitle(props.ListName).items.select("Title","Sales","Revenue","Quantity").get();
return{
  labels:items.map(i=>i.Title),
  datasets:[{
    label:"Bubble Data",
    data:items.map(i=>({
      x:i.Sales,
      y:i.Revenue,
      r:i.Quantity
    })),
    backgroundColor:"#35A2EB"
  }]
}
  },[props.ListName])
  return(
    <>
    
    {/* Bart Chart */}
      <ChartControl
    type={ChartType.Bar}
    datapromise={loadBarChart()}
    />
      <ChartControl
    type={ChartType.Pie}
    datapromise={loadPieChart()}
    />
      <ChartControl
    type={ChartType.Doughnut}
    datapromise={loadDougnutChart()}
    />
      <ChartControl
    type={ChartType.Line}
    datapromise={loadLineChart()}
    />
      <ChartControl
    type={ChartType.Bubble}
    datapromise={loadBubbleChart()}
    />
    </>
  )
}
export default DataVisualization;
