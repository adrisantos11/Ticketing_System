import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './Graph.scss';
import {GraphModel} from '../../Model/model';
import { Line, Bar } from 'react-chartjs-2';

interface Props {
    graphProps: GraphModel;
}

const Graph: React.FunctionComponent<Props> = (props: Props) => {
    const datasets: { 
        label: string;
        fill: boolean;
        lineTension: number;
        backgroundColor: any;
        borderColor: string;
        borderCapStyle: string;
        borderDashOffset: number;
        borderJoinStyle:
        string;
        data: any; }[] = [];

    const createDatasets = () => {
        if (props.graphProps.graphData != null) {
            for (let index = 0; index < props.graphProps.graphData.length; index++) {
                datasets.push({
                    label: props.graphProps.mainLabels[index],
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: props.graphProps.colorsList[index],
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    data: props.graphProps.graphData[index]
                })
                
            }   
        }
    }
    createDatasets();

    const graphType = props.graphProps.type;
    let data = {
        labels: props.graphProps.labels,
        datasets: datasets
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

    React.useEffect(() => {
        createDatasets();
    }, [props.graphProps.graphData])

    return(
        <div className="graphs-container">
            {graph}
        </div>
    )
}

export default Graph;
