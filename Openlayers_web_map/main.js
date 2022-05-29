window.onload = init;
const attributionControl = new ol.control.Attribution({
  collapsible: true,
});

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
        opacity: 1,
      }),
    ],
    target: "js-map",
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 0,
        visible: true,
        extent: [
          13957035.119643355, 3886409.4235566747, 14705484.243172048,
          4686912.891080462,
        ],
        opacity: 0.1,
      }),
      // Bing Maps Basemap Layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "AtYlGIWxIE6SZAHHFigm3lv2WfOVcoPtuErHVOYeZvmSzdUeEBPThaFVYafCQUJ0",
          imagerySet: "CanvasGray",
        }),
        visible: true,
      }),
    ],
  });
  map.addLayer(layerGroup);

  // CartoDB Basemap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      attributions: "© CARTO",
    }),
    visible: true,
  });
  map.addLayer(cartoDBBaseLayer);

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: true,
  });
  map.addLayer(tileDebugLayer);

  // Stamen Base Layer
  const StamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: true,
  });
  map.addLayer(StamenBaseLayer);

  // Stamen Basemap Layer
  const StamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.png",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: true,
  });
  map.addLayer(StamenBaseMapLayer);

  // Tile ArcGIS REST API Layer/
  const tileArcGISRESTAPILayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer",
      attributions:
        "Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government",
    }),
    visible: true,
  });
  map.addLayer(tileArcGISRESTAPILayer);

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?",
      params: {
        LAYERS: 1,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      // attributions:
      //   "<a href='https://nowcoast.noaa.gov' target='_blank'>© NOAA</a>",
    }),
  });
  map.addLayer(NOAAWMSLayer);
  NOAAWMSLayer.getSource().setAttributions(
    "<a href='https://nowcoast.noaa.gov' target='_blank'>© NOAA</a>"
  );
  NOAAWMSLayer.set("maxZoom", 5);

  map.on("click", (e) => {
    console.log(e.coordinate);
  });
}
