import React from "react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

import "./AreaChart.css";

const StaffAreaChart = ({ data }) => {
    return (
        <>
        <article className='charts-container'>
            <h4> {data[0].NAME} {data[0].SURNAME} </h4>
            <article className='project-staff-chart'>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 50,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="DATE" />
                        <YAxis unit="hr"/>
                        <Tooltip />
                        <Area type="monotone" dataKey="TIME" stroke="#FFC300" fill="#FFC300" />
                    </AreaChart>
                </ResponsiveContainer>
                </article>
            </article>
        </>
    );
}

export default StaffAreaChart;
