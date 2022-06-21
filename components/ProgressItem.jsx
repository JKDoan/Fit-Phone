import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function ProgressItem(props) {
  let dataSet = new Array()
  const data = {
    //   labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [props.completedDays, (props.allDays - props.completedDays)],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="progress-item-container">
      <h2 className="progress-item-activity-name">{props.activity}</h2>
      <div className="doughnut-parent">
        <Doughnut
          className="doughnut"
          data={data}
          width={50}
          height={50}
          options={{ cutout: 50 }}
        />
      </div>
      <div className="progress-info">
        <p className="doughnut-data-done">{props.completedDays} days of</p>
        <p className="doughnut-data-all">{props.allDays} days</p>
      </div>
    </div>
  );
}
