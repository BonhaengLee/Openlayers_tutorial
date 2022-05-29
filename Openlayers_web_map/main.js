window.onload = init;
// Attribution Control
const attributionControl = new ol.control.Attribution({
  collapsible: true,
});

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
    layers: [],
    target: "js-map",
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  // Baes Layers
  // Open Street Map Standard
  const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard",
  });
  // Open Street Map Humanitarian
  const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });
  // Bing Maps Basemap Layer
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "AtYlGIWxIE6SZAHHFigm3lv2WfOVcoPtuErHVOYeZvmSzdUeEBPThaFVYafCQUJ0",
      imagerySet: "CanvasGray",
    }),
    visible: false,
    title: "BingMaps",
  });
  // CartoDB Basemap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      attributions: "© CARTO",
    }),
    visible: false,
    title: "CartoDarkAll",
  });
  // Stamen Base Layer
  const StamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
    title: "StamenTerrainWithLabels",
  });
  // Stamen Basemap Layer
  const StamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.png",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
    title: "StamenTerrain",
  });

  // Base Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openStreetMapStandard,
      openStreetMapHumanitarian,
      bingMaps,
      cartoDBBaseLayer,
      StamenBaseLayer,
      StamenBaseMapLayer,
    ],
  });
  map.addLayer(baseLayerGroup);

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );
  for (const baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", function (event) {
      const baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach((el, idx, arr) => {
        const baseLayerName = el.get("title");
        el.setVisible(baseLayerName === baseLayerElementValue);
      });
    });
  }

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
  });

  // Tile ArcGIS REST API Layer/
  const tileArcGISRESTAPILayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer",
      attributions:
        "Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government",
    }),
    visible: false,
  });

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?",
      params: {
        LAYERS: 1,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      attributions:
        "<a href='https://nowcoast.noaa.gov' target='_blank'>© NOAA</a>",
    }),
    visible: false,
  });
}
