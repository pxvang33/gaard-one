import * as React from 'react';
import { loadModules } from '@esri/react-arcgis';
 
export default class BelwinLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphic: null
        };
    }
 
    render() {
        return null;
    }
 
    componentWillMount() {
        loadModules(['esri/Graphic']).then(([ Graphic ]) => {
            // Create a polygon geometry
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [//points of polygon, order matters!!
                [-92.82123, 44.93727],//bottom left
                [-92.81737, 44.93727],//bottom right
                [-92.81737, 44.93633],//top right
                [-92.82062, 44.93637]//top left
                ]
            };
 
            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                // color: '#90897f',
                outline: { // autocasts as new SimpleLineSymbol()
                color: '#90897f',
                width: 1
                }
            };
 
            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
 
            this.setState({ graphic });
            this.props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));
    }
 
    componentWillUnmount() {
        this.props.view.graphics.remove(this.state.graphic);
    }
}