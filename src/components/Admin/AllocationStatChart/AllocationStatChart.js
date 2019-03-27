import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar, } from 'react-chartjs-2';


class AllocationStatChart extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.getProductTypeName();
    }
    getProductTypeName = () => {
        let action = { type: 'FETCH_PRODUCT_TYPE' }
        this.props.dispatch(action)
    }

    render() {
        // console.log('in redux', this.props.reduxStore);
        const productName = this.props.reduxStore.productType.map((product) => {
            return product.product_name;
        });

        //Create an array to hold our total costs
        const totalScores = [];

        //just to shorten typing for legibility
        const products = this.props.reduxStore.product;

        //loop over all product types
        for (let type of this.props.reduxStore.productType) {
            //push the cost into total scores
            totalScores.push(products
                //only use one type of product
                .filter(function (product) {
                    return product.product_type_id == type.id;
                })
                //only interested in the cost
                .map(function (product) {
                    return product.cost;
                })
                //get the sum of all products of that type
                .reduce(function (accumulator, totalCost) {
                    return accumulator + totalCost;
                    //0 is initial value
                }, 0)
            )
        }
       
        const data = {
            labels: productName,
            datasets: [{
                data: totalScores,
                backgroundColor:
                    '#336600',

                borderWidth: 2,
                borderColor: '#777',
                hoverBorderWidth: 4,
                hoverBorderColor: '#000',
                label: 'Land Allocated', // for legend
            }],
        };
        return (
            <div>
                <div>
                    <Bar
                        data={data}
                        width={300}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Square Ft of Land Allocated'
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Square Feet',
                                        fontSize: 18,
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Product Types',
                                        fontSize: 18,
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(AllocationStatChart);