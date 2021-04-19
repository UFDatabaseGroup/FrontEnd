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
                chartLabels =[];
                this.props.apiData.forEach(elem => {
                    let dateObj = new Date(elem["TIMESTAMP_ID"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem["CONFIRMED"]));

                let chartData_Recovered = [];
                this.props.apiData.forEach(elem => chartData_Recovered.push(elem["RECOVERED"]))
                let chartData_Deaths = [];
                this.props.apiData.forEach(elem => chartData_Deaths.push(elem["DEATHS"]))

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'CONFIRMED CASES',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                        }, {
                            label: 'CONFIRMED RECOVERED',
                            borderColor: 'rgb(180, 90, 13)',
                            data: chartData_Recovered,
                        }, {
                            label: 'CONFIRMED DEATHS',
                            borderColor: 'rgb(180, 45, 12)',
                            data: chartData_Deaths
                        }]
                    },
                    options: {
                        //Customize chart options
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: false,
                                    text: 'Case Incidence'
                                }
                            }
                        }
                    }
                });
                break;
            case "2":
                /*
                * query 2: top 10 states in a country and the percent of active cases they have compared to the whole country
                * display: multiple line graph on active_percent for each state in the top 10 over time
                * */
                let states = [];
                chartLabels = [];

                // Find List of States
                this.props.apiData.forEach (elem => {
                    if (states.indexOf(elem["STATE"]) === -1) states.push(elem['STATE']);
                    let dateObj = new Date(elem["TIMESTAMP_ID"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });

                console.log(new Date(chartLabels[chartLabels.length - 2]).getTime())

                //this.props.apiData.forEach(elem => {});

                let chartData_State1 = [];
                let chartData_State2 = [];
                let chartData_State3 = [];
                let chartData_State4 = [];
                let chartData_State5 = [];
                let chartData_State6 = [];
                let chartData_State7 = [];
                let chartData_State8 = [];
                let chartData_State9 = [];
                let chartData_State10 = [];
                this.props.apiData.forEach(elem => {
                    switch (elem["STATE"]) {
                        case states[0]:
                            chartData_State1.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[1]:
                            chartData_State2.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[2]:
                            chartData_State3.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[3]:
                            chartData_State4.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[4]:
                            chartData_State5.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[5]:
                            chartData_State6.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[6]:
                            chartData_State7.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[7]:
                            chartData_State8.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[8]:
                            chartData_State9.push(elem["ACTIVE_PERCENT"]);
                            break;
                        case states[9]:
                            chartData_State10.push(elem["ACTIVE_PERCENT"]);
                            break;
                        default:
                            console.log(`UNKNOWN STATE FOUND IN API RESPONSE - ${elem["STATE"]}`)
                            break;
                    }
                });


                let tension_choice= 1;

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: `Active Case % In ${states[0]}`,
                            backgroundColor: 'rgb(217,165,137)',
                            data: chartData_State1,
                            tension: tension_choice,
                        }, {
                            label: `Active Case % In ${states[1]}`,
                            backgroundColor: 'rgb(139,213,211)',
                            data: chartData_State2,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[2]}`,
                            backgroundColor: 'rgb(107,224,104)',
                            data: chartData_State3,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[3]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State4,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[4]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State5,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[5]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State6,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[6]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State7,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[7]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State8,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[8]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State9,
                            tension: tension_choice
                        }, {
                            label: `Active Case % In ${states[9]}`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: chartData_State10,
                            tension: tension_choice
                        }],
                    },
                    options: {
                        //Customize chart options
                        spanGaps: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Dates'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Active Cases Percent (%)'
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
            `What are the total cases, total recovered, and total deaths in ${this.props.country1}?`,
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
