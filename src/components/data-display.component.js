import React, { Component } from "react";
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default class DataDisplay extends Component {
    myRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.myRef.current.getContext("2d");
        if (this.props.trendQuery === 1) {
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
                    datasets: [{
                        label: 'My First dataset',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [1,2,2],
                    }]
                },
                options: {
                    //Customize chart options
                }
            });
        }
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
