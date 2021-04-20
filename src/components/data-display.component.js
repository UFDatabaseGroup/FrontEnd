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
            case "2": {
                /*
                 * query 2: top 10 states in a country and the percent of active cases they have compared to the whole country
                 * display: multiple line graph on active_percent for each state in the top 10 over time
                 */
                /** @type {Map<number, Map<string, number>>} */
                let byTime = new Map();
                let statesData = new Map();

                for (let row of this.props.apiData) {
                    // layout to (time, states)
                    let timePoint = byTime.get(row.TIMESTAMP_ID);
                    if (timePoint) {
                        timePoint.set(row.STATE, row.ACTIVE_PERCENT);
                    } else {
                        let stateMap = new Map([[row.STATE, row.ACTIVE_PERCENT]]);
                        byTime.set(row.TIMESTAMP_ID, stateMap);
                    }

                    // also find all states
                    if (!statesData.has(row.STATE)) statesData.set(row.STATE, []);
                }

                // unroll to array and sort
                let byTimeUnrolled = [...byTime.entries()].sort((a, b) => a[0] - b[0]);

                // generate x axis
                let xSeries = byTimeUnrolled.map(a => new Date(a[0] * 1000).toLocaleDateString());

                // generate state series
                for (let [_time, states] of byTimeUnrolled) {
                    for (let [state, stateSeries] of statesData) {
                        stateSeries.push(states.get(state));
                    }
                }

                const TENSION_CHOICE = 0;
                // stole this list off stackoverflow (lol)
                // https://stackoverflow.com/a/56495465/8323492
                let lineColors = [
                    '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099',
                    '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395'
                ];

                let datasets = [...statesData.entries()].map(([state, series]) => ({
                    label: '% cases in ' + state,
                    backgroundColor: lineColors.pop(),
                    data: series,
                    tension: TENSION_CHOICE
                }));

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: xSeries,
                        datasets
                    },
                    options: {
                        //Customize chart options
                        interaction: { mode: 'index' },
                        spanGaps: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Active cases as % of all country cases'
                                }
                            }
                        },
                        elements: {
                            point: { radius: 2 }
                        }
                    }
                });
                return;
            }
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
                this.props.apiData.forEach(elem => {
                    let newDate = new Date(elem.UNEMPLOYMENT_TIME_STAMP);
                    chartLabels.push(newDate.toLocaleDateString())
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.VALUE));
                let chartData_CaseIncidence = [];
                this.props.apiData.forEach(elem => chartData_CaseIncidence.push(elem["AVG(AVG_INCIDENCE)"]));


                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'Unemployed %',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                            xAxisID: 'x',
                            yAxisID: 'unemployment'
                        }, {
                            label: 'Average Case Incidence',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData_CaseIncidence,
                            xAxisID: 'x',
                            yAxisID: 'incidence'
                        }],

                    },
                    options: {
                        //Customize chart options
                        interaction: { mode: 'index' },
                        scales: {
                            x: {
                                display: true,
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Dates'
                                }
                            },
                            unemployment: {
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'People unemployed'
                                }
                            },
                            incidence: {
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Incidence rate'
                                }
                            }
                        }
                    }
                });
                return;
            case "5":
                chartLabels =[];
                this.props.apiData.forEach(elem => {
                    let dateObj = new Date(elem["WORLDTIME"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.DEATHS_CONTRIBUTED));
                let chartData_Country = [];
                this.props.apiData.forEach(elem => chartData_Country.push(elem.DEATHS_COUNTRY));
                let chartData_World = [];
                this.props.apiData.forEach(elem => chartData_World.push(elem.DEATHS_WORLDWIDE));
                
                
                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'DEATHS CONTRIBUTED',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                            xAxisID: 'x',
                            yAxisID: 'percent'
                        }, {
                            label: 'DEATHS COUNTRY',
                            borderColor: 'rgb(3, 252, 132)',
                            data: chartData_Country,
                            xAxisID: 'x',
                            yAxisID: 'count'
                        }, {
                            label: 'DEATHS WORLDWIDE',
                            borderColor: 'rgb(132, 3, 252)',
                            data: chartData_World,
                            xAxisID: 'x',
                            yAxisID: 'count'
                        }],

                    },
                    options: {
                        //Customize chart options
                        interaction: {
                            mode: 'index'
                        },
                        scales: {
                            x: {
                                display: true,
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Number of Days since Start'
                                }
                            },
                            count: {
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Confirmed Deaths'
                                }
                            },
                            percent: {
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Deaths Contributed %'
                                }
                            }
                        }
                    }
                });
                return;
            case "6":
                chartLabels =[];
                this.props.apiData.forEach(elem => {
                    let dateObj = new Date(elem["TIMESTAMP_ID"] * 1000);
                    chartLabels.push(dateObj.toLocaleDateString());
                });
                chartData = [];
                this.props.apiData.forEach(elem => chartData.push(elem.CONFIRMED));
                let chartData_Delta = [];
                this.props.apiData.forEach(elem => chartData_Delta.push(elem.DELTA_CONFIRMED));

                new ChartJs.Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: chartLabels,
                        datasets: [{
                            label: 'Total confirmed cases count',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData,
                            xAxisID: 'x',
                            yAxisID: 'count'
                        }, {
                            label: 'New cases',
                            borderColor: 'rgb(180, 99, 50)',
                            data: chartData_Delta,
                            xAxisID: 'x',
                            yAxisID: 'delta'
                        }],

                    },
                    options: {
                        //Customize chart options
                        interaction: { mode: 'index' },
                        elements: {
                            point: { radius: 2 }
                        },
                        scales: {
                            x: {
                                display: true,
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Number of days since start'
                                }
                            },
                            count: {
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Total cases'
                                }
                            },
                            delta: {
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'New cases per day'
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
            `How much did each state of ${this.props.country1} contribute to the country total?`,
            `Compare the difference in deaths with the difference in incidence compared to the previous day for ${this.props.country1} over a time period`,
            `Unemployment compared to incidence rate by month in ${this.props.country1}?`,
            `What percentage of deaths did ${this.props.country1} contribute to the worldwide death count during the pandemic?`,
            `How many new cases does ${this.props.country1} gain per day?`];

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
