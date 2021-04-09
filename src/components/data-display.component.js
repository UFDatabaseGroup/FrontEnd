import React, { Component } from "react";
import { Chart, Utils } from "chart.js"

export default class DataDisplay extends Component {
    myRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.myRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
                datasets: [{
                    label: 'My First dataset',
                    // backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 25, 10],
                }]
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
