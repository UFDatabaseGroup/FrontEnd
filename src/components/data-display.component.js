import React, { Component } from "react";
import * as ChartJs from 'chart.js';

ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

export default class DataDisplay extends Component {
    myRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.myRef.current.getContext("2d");
        let chartLabels;
        let chartData;

        switch (this.props.trendQuery) {
            case "1":
                new ChartJs.Chart(myChartRef, {
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
                return;
            case "2":
                chartLabels =[];
                this.props.apiData.forEach(elem => {
                    let dateObj = new Date(elem["TIMESTAMP_ID"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem["AVG(COVID_DATA.INCIDENCE)"]));

                new ChartJs.Chart(myChartRef, {
                    type: "bar",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'Case Incidence In China',
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData,
                        }],
                    },
                    options: {
                        //Customize chart options
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Number of Days since Start of Range'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Case Incidence'
                                }
                            }
                        }
                    }
                });
                return;
            case "3":
                chartLabels =[];
                this.props.apiData.forEach(elem => {
                    let dateObj = new Date(elem["TIMESTAMP_ID"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.TOTAL_INCIDENCE));

                let chartData_death = [];
                this.props.apiData.forEach(elem => chartData_death.push(elem.DEATH_DIFFERENCES));

                new ChartJs.Chart(myChartRef, {
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            type: "line",
                            label: 'Difference in Case Incidence To The Previous Day',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                        },
                            {
                                type: "line",
                                label: 'Difference in Deaths To The Previous Day',
                                borderColor: 'rgb(56,93,255)',
                                data: chartData_death
                            }],

                    },
                    options: {
                        //Customize chart options
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Number of Days since Start'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Total Per 100,000 People'
                                }
                            }
                        }
                    }
                });
                return;
            case "4":
                chartLabels =[];
                this.props.apiData.forEach(elem => chartLabels.push(elem.UNEMPLOYMENT_TIME_STAMP));
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.CONFIRMED));

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'Confirmed cases in china',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                        }],

                    },
                    options: {
                        //Customize chart options
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Number of Days since Start'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Confirmed Cases'
                                }
                            }
                        }
                    }
                });
                return;
            case "5":
                chartLabels =[];
                this.props.apiData.forEach(elem => chartLabels.push(elem.TIMESTAMP));
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.CONFIRMED));

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'Confirmed cases in china',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                        }],

                    },
                    options: {
                        //Customize chart options
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Number of Days since Start'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Confirmed Cases'
                                }
                            }
                        }
                    }
                });
                return;
            default:
                console.log(`${this.props.trendQuery} - is not a valid choice`)
                return;

        }
    }

    render() {
        const TitleQuery = [
            `1`,
            `How much does population density affect COVID-19 transmission rates in ${this.props.country1}?`,
            `Compare the difference in deaths with the difference in incidence compared to the previous day for a region over a time period`,
            `How much did COVID-19 affect unemployment rates (population) in ${this.props.country1}?`,
            `5`];

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h2>Query Number {this.props.trendQuery}</h2>
                    <h4>{TitleQuery[parseInt(this.props.trendQuery) - 1]}</h4>
                    <canvas
                        id="myChart"
                        ref={this.myRef}
                        width="800"
                        height="450"
                    />
                </div>
            </div>
        );
    }
}
