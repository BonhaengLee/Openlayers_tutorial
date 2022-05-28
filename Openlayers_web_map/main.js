window.onload = init;

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 0,
      // extent: [
      //   13957035.119643355, 3886409.4235566747, 14705484.243172048,
      //   4686912.891080462,
      // ],
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: false,
        extent: [
          13957035.119643355, 3886409.4235566747, 14705484.243172048,
          4686912.891080462,
        ],
        opacity: 0.5,
      }),
    ],
    target: "js-map",
  });

  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 0,
        visible: false,
        extent: [
          13957035.119643355, 3886409.4235566747, 14705484.243172048,
          4686912.891080462,
        ],
        opacity: 0.5,
      }),
      // Bing Maps Basemap Layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "AtYlGIWxIE6SZAHHFigm3lv2WfOVcoPtuErHVOYeZvmSzdUeEBPThaFVYafCQUJ0",
          imagerySet: "CanvasGray",
        }),
        visible: false,
      }),
    ],
  });
  map.addLayer(layerGroup);

  // CartoDB Basemap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
    }),
    visible: false,
  });
  map.addLayer(cartoDBBaseLayer);

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
  });
  map.addLayer(tileDebugLayer);

  // Stamen Base Layer
  const StamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
    }),
    visible: false,
  });
  map.addLayer(StamenBaseLayer);

  // Stamen Basemap Layer
  const StamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.png",
    }),
    visible: false,
  });
  map.addLayer(StamenBaseMapLayer);

  // Tile ArcGIS REST API Layer/
  const tileArcGISRESTAPILayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    visible: true,
  });
  map.addLayer(tileArcGISRESTAPILayer);

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http:///nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?",
      params: {
        LAYERS: 1,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
    }),
  });
  map.addLayer(NOAAWMSLayer);

  map.on("click", (e) => {
    console.log(e.coordinate);
  });
}
