import React from "react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

import "./AreaChart.css";

const ProjectAreaChart = ({ data }) => {
    return (
        <article className='project-area-chart' style={{ width: '97%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DATE">
                        <label value="Date" position="insideBottomRight" offset={-5} />
                    </XAxis>
                    <YAxis unit="hr">
                        <label value="Time (hours)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip />
                    <Area type="monotone" dataKey="TIME" stroke="#FF6D00" fill="#FF6D00" />
                </AreaChart>
            </ResponsiveContainer>
        </article>
    );
}

export default ProjectAreaChart;
