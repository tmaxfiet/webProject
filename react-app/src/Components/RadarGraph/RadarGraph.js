import React from 'react';
import './RadarGraph.css';
var Chart = require('chart.js');

var options = {
    scale: {
        angleLines: {
            display: false,
        },
        gridLines: {
            display: false,
        },
        pointLabels: {
            display: false,
        },
        ticks: {
            display: false,
            backdropColor: 'red',
            suggestedMin: 0,
            suggestedMax: 1,
            showLabelBackdrop: false,
        }
    },
    legend: {
        display: false,
    }
};

class RadarGraph extends React.Component {
    componentDidUpdate() {
        const beatsNode = this.beatsNode;
        const barsNode = this.barsNode;
        const segmentsNode = this.segmentsNode;
        const sectionsNode = this.sectionsNode;

        let beatsData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Beats',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                pointRadius: 0,
            }]
        }

        let barsData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Bars',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(212, 37, 37, 0.2)',
                pointRadius: 0,
            }]
        }

        let sectionsData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Sections',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(37, 37, 212, 0.2)',
                pointRadius: 0,
            }]
        }

        let segmentsData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Segments',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(37, 212, 37, 0.2)',
                pointRadius: 0,
            }]
        }

        /***
         * Create individual chart for each dataSet since calling so many updates
         * steps on each other and ruins 'duration' animation
         */
        let myBeatsChart = new Chart(beatsNode, {
            type: 'radar',
            data: beatsData,
            options: options
        });

        let myBarsChart = new Chart(barsNode, {
            type: 'radar',
            data: barsData,
            options: options
        });

        let mySectionsChart = new Chart(sectionsNode, {
            type: 'radar',
            data: sectionsData,
            options: options
        });

        let mySegmentsChart = new Chart(segmentsNode, {
            type: 'radar',
            data: segmentsData,
            options: options,
        });



        // Handles graph updates for beats, first two indices are beats 'zone'
        this.props.audioData.beats.forEach((beat) => {
            // Wait for beat to have happened
            setTimeout(() => {
                // Set beats value to 1 for half its duration
                myBeatsChart.data.datasets[0].data = [1, 1, 0, 0, 0];
                myBeatsChart.update({
                    duration: beat.duration * 1000 / 2,
                    lazy: false
                });
                setTimeout(() => {
                    // Set beats value to 0 for second half, simulates up down of beat
                    myBeatsChart.data.datasets[0].data = [0, 0, 0, 0, 0];
                    myBeatsChart.update({
                        duration: beat.duration * 1000 / 2,
                        lazy: false
                    });
                }, beat.duration * 1000 / 2)
            }, beat.start * 1000);
        });

        // Handles graph updates for bars, index 2 & 3 are bars zone
        this.props.audioData.bars.forEach((bar) => {
            // Wait for bar to have happened
            setTimeout(() => {
                // Set bars value to 1 for half its duration
                myBarsChart.data.datasets[0].data = [0, 1, 1, 0, 0, 0];
                myBarsChart.update({
                    duration: bar.duration * 1000 / 2,
                    lazy: false
                });
                setTimeout(() => {
                    // Set bars value to 0 for second half, simulates up down of bar
                    myBarsChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
                    myBarsChart.update({
                        duration: bar.duration * 1000 / 2,
                        lazy: false
                    });
                }, bar.duration * 1000 / 2)
            }, bar.start * 1000);
        });

        // Handles graph updates for sections, index 3 & 4 is section zone
        this.props.audioData.sections.forEach((section) => {
            // Wait for section to have happened
            setTimeout(() => {
                // Set sections value to 1 for half its duration
                mySectionsChart.data.datasets[0].data = [0, 0, 1, 1, 0, 0];
                mySectionsChart.update({
                    duration: section.duration * 1000 / 2,
                    lazy: false
                });
                setTimeout(() => {
                    // Set sections value to 0 for second half, simulates up down of section
                    mySectionsChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
                    mySectionsChart.update({
                        duration: section.duration * 1000 / 2,
                        lazy: false
                    });
                }, section.duration * 1000 / 2)
            }, section.start * 1000);
        });

        // Handles graph updates for segments, index 4, 5 & 1 is segment zone
        this.props.audioData.segments.forEach((segment) => {
            // Wait for segment to have happened
            setTimeout(() => {
                // Set segments value to 1 for half its duration
                mySegmentsChart.data.datasets[0].data = [1, 0, 0, 1, 1];
                mySegmentsChart.update({
                    duration: segment.duration * 1000 / 2,
                    lazy: false
                });
                setTimeout(() => {
                    // Set segments value to 0 for second half, simulates up down of segment
                    mySegmentsChart.data.datasets[0].data = [0, 0, 0, 0, 0];
                    mySegmentsChart.update({
                        duration: segment.duration * 1000 / 2,
                        lazy: false
                    });
                }, segment.duration * 1000 / 2)
            }, segment.start * 1000);
        });
    }

    render() {
        return (
            <div id="radar-graph-container">
                <canvas
                    style={{ width: 800, height: 300 }}
                    ref={node => (this.beatsNode = node)}
                    id='beats-canvas'
                    className='canvas-class'
                />
                <canvas
                    style={{ width: 800, height: 300 }}
                    ref={node => (this.barsNode = node)}
                    id='bars-canvas'
                    className='canvas-class'
                />
                <canvas
                    style={{ width: 800, height: 300 }}
                    ref={node => (this.segmentsNode = node)}
                    id='segments-canvas'
                    className='canvas-class'
                />
                <canvas
                    style={{ width: 800, height: 300 }}
                    ref={node => (this.sectionsNode = node)}
                    id='sections-canvas'
                    className='canvas-class'
                />
            </div>
        )
    }
}

export default RadarGraph; 