import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './Graph.scss';
import {GraphModel} from '../../Model/model';
import { Line, Bar } from 'react-chartjs-2';

interface Props {
    graphProps: GraphModel;
}

const Graph: React.FunctionComponent<Props> = (props: Props) => {
    const graphType = props.graphProps.type;
    let data = {
        labels: props.graphProps.labels,
        datasets: [{
            label: props.graphProps.mainLabel,
            fill: false,
            lineTension: 0.5,
            backgroundColor: props.graphProps.colorsList,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            // pointBorderColor: 'rgba(75,192,192,1)',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            // pointHoverBorderColor: 'rgba(220,220,220,1)',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: props.graphProps.graphData
        }]
    };

    let options = {
        legend: {
            labels: {
                fontSize: 15
            }
        },
        title: {
            display: true,
            text: props.graphProps.title,
            fontSize: 20,
            fontColor: '#636b6f'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }
    let graph;
    if (graphType == 'bar') {
        graph = <Bar data={data} options={options}/>
    } else if(graphType == 'line') {
        graph = <Line data={data} options={options}/>
    }

    return(
        <div className="graphs-container">
            {graph}
        </div>
    )
}

export default Graph;
