import React from 'react';
import './RadarGraph.css';
var Chart = require('chart.js');

var options = {
    scale: {
        angleLines: {
            //display: false,
        },
        gridLines: {
            //display: false,
        },
        pointLabels: {
            //display: false,
        },
        ticks: {
            //display: false,
            backdropColor: 'red',
            suggestedMin: 0,
            suggestedMax: 1,
            showLabelBackdrop: false,
        }
    }
};

class RadarGraph extends React.Component {
    componentDidMount() {
        const node = this.node;

        let data = {
            labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
            datasets: [{
                label: 'First dataset',
                data: [20, 10, 4, 2],
                backgroundColor: 'blue',
            }]
        }

        let myRadarChart = new Chart(node, {
            type: 'radar',
            data: data,
            options: options
        });
    }

    componentDidUpdate() {        
        const node = this.node;

        let data = {
            labels: ['1', '2', '3', '4'],
            datasets: [{
                label: 'Beats',
                data: [0, 0, 0, 0],
                backgroundColor: 'blue',
            },
            {
                label: 'Bars',
                data: [0, 0, 0, 0],
                backgroundColor: 'red',
            },
            {
                label: 'Sections',
                data: [0, 0, 0, 0],
                backgroundColor: 'yellow',
            },
            {
                label: 'Segments',
                data: [0, 0, 0, 0],
                backgroundColor: 'green',
            }]
        }

        let myRadarChart = new Chart(node, {
            type: 'radar',
            data: data,
            options: options
        });

        // Handles graph updates for beats
        this.props.audioData.beats.forEach( (beat) => {
            // Wait for beat to have happened
            setTimeout( () => {
                // Set beats value to 1 for half its duration
                myRadarChart.data.datasets[0].data = [1, 1, 1, 1];
                myRadarChart.update({
                    duration: beat.duration * 1000 / 2
                });
                setTimeout( () => {
                    // Set beats value to 0 for second half, simulates up down of beat
                    myRadarChart.data.datasets[0].data = [0, 0, 0, 0];
                    myRadarChart.update({
                        duration: beat.duration * 1000 / 2
                    });
                }, beat.duration * 1000 / 2)
            }, beat.start * 1000);
        });

        // Handles graph updates for bars
        this.props.audioData.bars.forEach( (bar) => {
            // Wait for bar to have happened
            setTimeout( () => {
                // Set bars value to 1 for half its duration
                myRadarChart.data.datasets[1].data = [3, 3, 3, 3];
                myRadarChart.update({
                    duration: bar.duration * 1000 / 2
                });
                setTimeout( () => {
                    // Set bars value to 0 for second half, simulates up down of bar
                    myRadarChart.data.datasets[1].data = [0, 0, 0, 0];
                    myRadarChart.update({
                        duration: bar.duration * 1000 / 2
                    });
                }, bar.duration * 1000 / 2)
            }, bar.start * 1000);
        });

        // Handles graph updates for sections
        this.props.audioData.sections.forEach( (section) => {
            // Wait for section to have happened
            setTimeout( () => {
                // Set sections value to 1 for half its duration
                myRadarChart.data.datasets[2].data = [6, 6, 6, 6];
                myRadarChart.update({
                    duration: section.duration * 1000 / 2
                });
                setTimeout( () => {
                    // Set sections value to 0 for second half, simulates up down of section
                    myRadarChart.data.datasets[2].data = [0, 0, 0, 0];
                    myRadarChart.update({
                        duration: section.duration * 1000 / 2
                    });
                }, section.duration * 1000 / 2)
            }, section.start * 1000);
        });

        // Handles graph updates for segments
        this.props.audioData.segments.forEach( (segment) => {
            // Wait for segment to have happened
            setTimeout( () => {
                // Set segments value to 1 for half its duration
                myRadarChart.data.datasets[3].data = [9, 9, 9, 9];
                myRadarChart.update({
                    duration: segment.duration * 1000 / 2
                });
                setTimeout( () => {
                    // Set segments value to 0 for second half, simulates up down of segment
                    myRadarChart.data.datasets[3].data = [0, 0, 0, 0];
                    myRadarChart.update({
                        duration: segment.duration * 1000 / 2
                    });
                }, segment.duration * 1000 / 2)
            }, segment.start * 1000);
        });
    }

    render() {
        return (
            <div>
                <canvas
                style={{ width: 800, height: 300 }}
                ref={node => (this.node = node)}
                id='my-canvas'
                />
            </div>
        )
    }
}

export default RadarGraph; 