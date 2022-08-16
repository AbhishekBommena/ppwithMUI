import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Chart } from "react-google-charts";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Card from "@mui/material/Card";

const options = {
  // pieHole: 0.4,
  // is3D: true,
  colors: ["#006E7F", "#EB5353", "#F39422", "#4596FF"], //"#6E85B7","FAC213","#FF8585"
  // backgroundColor: '#000000', //f0f9ff
  // chartArea: {'width': '40%', 'height': '80%'},
  // legend: {'position': 'top'}
};


function Dashboard() {
  const [messageCount, setMessageCount] = useState([]);
  const [transferCount, setTransferCount] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topBanks, setTopBanks] = useState([]);

  useEffect(() => {
    //message code count
    const getMessageCodeCount = async () => {
      const Messagedata = await UserService.getMessageCount().then((res) => {
        const Mdata = [["Message codes", "No of Tranasactions"]];
        const arr3 = Mdata.concat(res);
        setMessageCount(arr3);
      });

      //transfer type code
      const Transferdata = await UserService.getTransferCount().then((res) => {
        console.log(res);
        const Tdata = [["Transfer codes", "No of Tranasactions"]];
        const arr3 = Tdata.concat(res);
        setTransferCount(arr3);
      });

      //top customers
      const TopCustomers = await UserService.getTopCustomers().then((res) => {
        setTopCustomers(res);
      });

      //fetch Top banks
      const TopBanks = await UserService.getTopBanks().then((res) => {
        setTopBanks(res);
        console.log(res);
      });
    };

    getMessageCodeCount();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col ">
            <ResponsiveContainer width="100%" height="96%">
              <Card>
                <h3 style={{ textAlign: "center" }}> Top Customers </h3>
                <BarChart
                  width={700}
                  height={300}
                  data={topCustomers}
                  margin={{
                    top: 10,
                    right: 50,
                    left: 40,
                    bottom: 5,
                  }}
                  barSize={30}
                >
                  <XAxis
                    dataKey="customerid"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip stroke="#000000" />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="total"
                    fill="#116530"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </Card>
            </ResponsiveContainer>
          </div>

          <div className="col">
            <Card>
              <h3 style={{ textAlign: "center" }}>Message Codes</h3>
              <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={messageCount}
                options={options}
              />
            </Card>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: "60px" }}>
        <div class="row">
          <div className="col">
            <Card>
              <h3 style={{ textAlign: "center" }}>Transfer Types</h3>
              <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={transferCount}
                options={options}
              />
            </Card>
          </div>

          <div className="col">
            <ResponsiveContainer width="100%" height="96%">
              <Card>
                <h3 style={{ textAlign: "center" }}> Top Banks </h3>
                <BarChart
                  width={700}
                  height={300}
                  data={topBanks}
                  margin={{
                    top: 15,
                    right: 80,
                    left: 60,
                    bottom: 5,
                  }}
                  barSize={30}
                >
                  <XAxis
                    dataKey="bic"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip stroke="#000000" />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="total" fill="#116530" />
                </BarChart>
              </Card>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
