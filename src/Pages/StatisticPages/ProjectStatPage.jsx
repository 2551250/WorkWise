import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

import Header from "../../Components/Header/Header";
import "./ProjectStatPage.css"

// Sample data for the charts
const data = [
  { name: 'John', hoursSpent: 40, date: '2024-05-01', cumulativeHours: 40 },
  { name: 'Jane', hoursSpent: 35, date: '2024-05-02', cumulativeHours: 75 },
  // More data...
];

const members = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // More members...
];

const ProjectStatPage = () => {
  return (
   
    <>
    <Header>
      <h1> Workwise </h1>
      <button className="logout-button">Log Out</button>
    </Header>

    <main>
      <section>
        <h1>Project Name</h1>
      </section>
      <section className="content">

        <article className="members">
          <h2>Members</h2>
          <ul>
            {members.map(member => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </article>

        <article className="charts">
          <h2>Charts</h2>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hoursSpent" fill="#8884d8" />
          </BarChart>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cumulativeHours" stroke="#82ca9d" />
          </LineChart>
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="hoursSpent" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </article>
        
      </section>
    </main>
    </>
  );
};

export default ProjectStatPage;
