import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import useState from 'react'
// import Datepicker
import Script from "next/script";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Line,
//     Legend,
//   } from 'chart.js';

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import ProgressItem from "./ProgressItem";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

// import {Chart as ChartJS} from 'chart.js/auto'

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Line
//     );
// import {ChartConfig} from '../components/ChartConfig';
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    // {
    //   label: "My First dataset",
    //   data: [1, 2, 3, 1, 5, 6],
    //   // backgroundColor: "rgba(59, 130, 246, 0.2)",
    //   borderColor: "#FF6384",
    // },
    // {
    //   label: "My First dataset",
    //   data: [6, 3, 3, 2, 1, 6],
    //   // backgroundColor: "#FF6384",
    //   borderColor: "#3B82F6",
    // },
  ],
};
const options = {
  plugins: {
    // show legends for our graph
    legend: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      // fill: "start",
      // legend: 'end',
      pointHoverRadius: 5,
    },
    point: {
      radius: 3,
      hitRadius: 10,
    },
  },
  lineHeightAnnotation: {
    always: true,
    lineWeight: 1.5,
  },

  //   animate in
  animation: {
    duration: 1,
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function useOverallProgressData() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const callback = React.useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/overall-progress");
    const json = await response.json();
    setData(json);
    setIsLoading(false);
  }, []);

  return { data, isLoading, callback };
}

export default function OverallProgress() {
  let dataSet = new Array();

  const {
    data: myData,
    isLoading,
    callback: loadData,
  } = useOverallProgressData();

  const calcu = () => {
    myData.items.forEach((activity) => {
      dataSet.push({
        label: activity.title,
        data: activity.progress.previousDays,
        borderColor: activity.progress.color,
      });
    });
    data.datasets = dataSet;
  };
  React.useEffect(() => {
    loadData();
    if (myData.launched == false) {
      prompt("How was your dream?");
    }
  }, []);

  console.log("myData", myData);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {myData.launched ? (
              <></>
            ) : (
              <div hidden="hidden">
                {/* {prompt("How was your dream?")}
                {(myData.launched = true)} */}
              </div>
            )}
            <div className="chart-container p-2">
              <h1 className="overall-progress-title">Overall Progress</h1>
              {myData.items.length > 0 ? (
                <div className="line-chart">
                  {calcu()}
                  <Line data={data} options={options} />
                </div>
              ) : (
                <h1>No available activites</h1>
              )}

              {/* <Line data={data} options={options} /> */}
            </div>
            <h1 className="overall-progress-title">Status Per Activity</h1>
            <div className="items">
              {myData.items.length > 0 ? (
                myData.items.map((activity) => (
                  <div className="item">
                    {/* {console.log("Compl Days: " + activity)} */}
                    <ProgressItem
                      key={activity.id}
                      completedDays={activity.progress.completedDays}
                      activity={activity.title}
                      allDays={activity.progress.allDays}
                    />
                  </div>
                ))
              ) : (
                <h1>No available activites</h1>
              )}

              {/* <div className="item">
            <ProgressItem activity="Meditation" />
          </div>
          <div className="item">
            <ProgressItem activity="Reading" />
          </div>
          <div className="item">
            <ProgressItem activity="Workout" />
          </div>
          <div className="item">
            <ProgressItem activity="Spirituality" />
          </div> */}
            </div>
          </div>
        )}
      </div>
      {/* <Script src="../scripts/script.js" strategy="lazyOnload" /> */}
    </>
  );
}
