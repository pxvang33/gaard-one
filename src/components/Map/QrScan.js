import * as React from 'react';
import { loadModules } from '@esri/react-arcgis';

export default class QrScan extends React.Component {
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
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      // // Create a point
      // const point = new Point({
      //   longitude: this.props.point.bl_corner_lon,
      //   latitude: this.props.point.bl_corner_lat
      // });

      // Create a polygon geometry
      const polygon = {
        type: "polygon", // autocasts as new Polygon()
        rings: [//points of polygon, order matters!!
          [this.props.point.bl_corner_lon, this.props.point.bl_corner_lat],
          [this.props.point.bl_corner_lon, this.props.point.tr_corner_lat],
          [this.props.point.tr_corner_lon, this.props.point.tr_corner_lat],
          [this.props.point.tr_corner_lon, this.props.point.bl_corner_lat]
          ]
      };

      // Create a symbol for drawing the point
      // let markerSymbol = new SimpleMarkerSymbol({
      //   size: 10,
      //   style: 'square',
      //   color: '#647c36',
      //   outline: null
      // });

      const fillSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        // color: '#647c36',
        outline: { // autocasts as new SimpleLineSymbol()
        color: '647c36',
        width: 1
        }
      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol
      });

      this.setState({ graphic: pointGraphic });
      this.props.view.graphics.add(pointGraphic);
    }).catch((err) => console.error(err));
  }

  componentWillUnmount() {
    this.props.view.graphics.remove(this.state.graphic);
  }
}