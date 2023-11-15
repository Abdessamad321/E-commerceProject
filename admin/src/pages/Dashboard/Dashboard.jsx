import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import data from "./data";
import axios from "axios";
/* #fdca40-#d9bd76-#c2c3c644-#c2c3c6-#f8e4af-#c2c3c6-#590404-#f8b930-#080708-#a80b0b */
import {
  LineChart,
  ComposedChart,
  Line,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [error, setError] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/v1/order/allorders"
        );
        const fetchedData = response.data;
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:7000/v1/allcustomers/all"
        );
        const count = response.data.count;
        console.log(count);
        setCustomerCount(count);
        setLoading(false);
        setError(null);
      } catch (err) {
        setCustomerCount(null);
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:7000/v1/order/getallorders"
        );
        const count = response.data.count;
        console.log(count);
        setOrderCount(count);
        setLoading(false);
        setError(null);
      } catch (err) {
        setOrderCount(null);
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="dash">
      <div className="chart1">
        <h2 className="chart-title">Numbre of sales </h2>
        <ResponsiveContainer className="chart" width="100%" height="80%">
          <ComposedChart width={300} height={200} data={data.data}>
            <CartesianGrid className="CartesianGrid" stroke="#c2c3c6" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#fdca40"
              stroke="#590404"
            />
            <Bar dataKey="pv" barSize={20} fill="#590404" />
            <Line type="monotone" dataKey="uv" stroke="#f8b930" />
            <Scatter dataKey="cnt" fill="#d9bd76" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="chart2">
        <h2 className="chart2-title">Total of registered customers</h2>
        <div className="counter">
          {loading && <p className="txt">Loading...</p>}
          {error && <p className="txt">Error: {error}</p>}
          {customerCount !== null && <p>{`${customerCount}`}</p>}
        </div>
      </div>
      <div className="chart3">
        <h2 className="chart-title">Last placed orders</h2>
        <div className="chart3-parent">
        <div className="chart3-counter">
        {loading && <p className="txt">Loading...</p>}
          {error && <p className="txt">Error: {error}</p>}
          {orderCount !== null && <p>{`${orderCount}`}</p>}
        </div>
        {/* <div className="chart3-courbe"> */}
        <ResponsiveContainer width="50%" height="60%">
          <LineChart width={300} height={100} data={datas}>
            <Line
              type="monotone"
              dataKey="count"
              stroke="#590404"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* </div> */}
        </div>
        {/* <ResponsiveContainer width="100%" height="80%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data.data01}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#590404"
              label
            />
            <Pie
              dataKey="value"
              data={data.data02}
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={70}
              fill="#82ca9d"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer> */}
      </div>
      <div className="chart4">
        <h2 className="chart4-title">Total revenues</h2>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart
            width={500}
            height={400}
            data={data.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="white" fill="white" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
