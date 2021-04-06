import React, { Component } from "react";
import { Chart } from "chart.js"
import classes from ".."

export default class DataDisplay extends Component {
    myRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.myRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>QuerySelection</h1>
                    <p>Loren</p>
                    <canvas
                        id="myChart"
                        ref={this.myRef}
                        width="400"
                        height="400"
                    />
                </div>
            </div>
        );
    }
}
