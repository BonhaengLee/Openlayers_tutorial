window.onload = init;

function init() {
  // Attribution Control
  const attributionControl = new ol.control.Attribution({
    collapsible: true,
  });

  // Map object
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
    target: "js-map",
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  // Base Layers
  // Openstreet Map Standard
  const openstreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard",
  });

  // Openstreet Map Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });

  // Bing Maps Basemap Layer
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "Your Bingmaps API Key Here",
      imagerySet: "CanvasGray", // Road, CanvasDark, CanvasGray
    }),
    visible: false,
    title: "BingMaps",
  });

  // CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      attributions: "© CARTO",
    }),
    visible: false,
    title: "CartoDarkAll",
  });

  // Stamen basemap layer
  const StamenTerrainWithLabels = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
    title: "StamenTerrainWithLabels",
  });

  const StamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
    title: "StamenTerrain",
  });

  // Base Vector Layers
  // Vector Tile Layer OpenstreetMap
  const openstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url: "https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=eNZMd85Lie6HD3TUfd5e",
      format: new ol.format.MVT(),
      attributions:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    }),
    visible: false,
    title: "VectorTileLayerOpenstreetMap",
  });

  const openstreetMapVectorTileStyles =
    "https://api.maptiler.com/maps/436160e2-0bbb-47fe-bbd2-33d6f0f8d185/style.json?key=LWnl5MKlGtDBjZf2EntB";
  fetch(openstreetMapVectorTileStyles).then(function (response) {
    response.json().then(function (glStyle) {
      olms.applyStyle(openstreetMapVectorTile, glStyle, "v3-openmaptiles");
    });
  });

  // Base Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandard,
      openstreetMapHumanitarian,
      bingMaps,
      cartoDBBaseLayer,
      StamenTerrainWithLabels,
      StamenTerrain,
      openstreetMapVectorTile,
    ],
  });
  map.addLayer(baseLayerGroup);

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );
  for (let baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", function () {
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function (element, index, array) {
        let baseLayerName = element.get("title");
        element.setVisible(baseLayerName === baseLayerElementValue);
      });
    });
  }

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: true,
    title: "TileDebugLayer",
  });

  // tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer",
      attributions:
        "Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government",
    }),
    visible: true,
    title: "TileArcGISLayer",
  });

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?",
      params: {
        LAYERS: 5,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      attributions: "<a href=https://nowcoast.noaa.gov/>© NOAA<a/>",
    }),
    visible: true,
    title: "NOAAWMSLayer",
  });

  // Static Image OpenstreetMap
  const openstreetMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: "./data/static_images/openlayers_static_humanitarian.PNG",
      imageExtent: [
        4991698.9328313675, 5050292.393744084, 10008191.828130603,
        10013417.911357462,
      ],
      attributions:
        "<a href=https://www.openstreetmap.org/copyright/>© OpenStreetMap contributors<a/>",
    }),
    title: "openstreetMapFragmentStatic",
  });

  // Vector Layers
  // Styling of vector features
  const fillStyle = new ol.style.Fill({
    color: [40, 119, 247, 1],
  });
  // Style for lines
  const strokeStyle = new ol.style.Stroke({
    color: [30, 30, 31, 1],
    width: 1.2,
    lineCap: "square",
    lineJoin: "bevel",
    lineDash: [3, 30],
  });

  // Central EU Countries GeoJSON VectorImage Layer
  const EUCountriesGeoJSONVectorImage = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: "./data/vector_data/Central_EU_countries_GeoJSON.geojson",
      format: new ol.format.GeoJSON(),
    }),
    visible: true,
    title: "CentralEUCountriesGeoJSON",
    style: new ol.style.Style({
      fill: fillStyle,
      stroke: strokeStyle,
    }),
  });

  const EUCountriesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "./data/vector_data/Central_EU_countries_KML.kml",
      format: new ol.format.KML(),
    }),
    visible: false,
    title: "CentralEUCountriesKML",
  });

  // HeatMap
  const heatMapOnlineFBUsers = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      url: "./data/vector_data/onlineFBUsers.geojson",
      format: new ol.format.GeoJSON(),
    }),
    radius: 15,
    blur: 10,
    gradient: ["#00f", "#0ff", "#0f0", "#ff0", "black"],
    visible: false,
    title: "OnlineFBUsers",
  });

  // Raster Tile Layer Group
  const layerGroup = new ol.layer.Group({
    layers: [
      tileArcGISLayer,
      NOAAWMSLayer,
      tileDebugLayer,
      openstreetMapFragmentStatic,
      EUCountriesGeoJSONVectorImage,
      EUCountriesKML,
      heatMapOnlineFBUsers,
    ],
  });
  map.addLayer(layerGroup);

  // Layer Switcher Logic for Raster Tile Layers
  const tileRasterLayerElements = document.querySelectorAll(
    ".sidebar > input[type=checkbox]"
  );
  for (let tileRasterLayerElement of tileRasterLayerElements) {
    tileRasterLayerElement.addEventListener("change", function () {
      let tileRasterLayerElementValue = this.value;
      let tileRasterLayer;

      layerGroup.getLayers().forEach(function (element, index, array) {
        if (tileRasterLayerElementValue === element.get("title")) {
          tileRasterLayer = element;
        }
      });
      tileRasterLayer.setVisible(this.checked);
    });
  }

  // Vector Feature Popup Information
  const overlayContainerElement = document.querySelector(".overlay-container");
  const overlayLayer = new ol.Overlay({
    element: overlayContainerElement,
  });
  map.addOverlay(overlayLayer);
  const overlayFeatureName = document.getElementById("feature-name");
  const overlayFeatureAdditionalInfo = document.getElementById(
    "feature-additional-info"
  );

  // Vector Feature Popup Logic
  map.on(
    "click",
    function (e) {
      overlayLayer.setPosition(undefined);
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        const clickedCoordinate = e.coordinate;
        const clickedFeatureName = feature.get("name");
        const clickedFeatureAdditionalInfo = feature.get("additionalinfo");
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureAdditionalInfo.innerHTML = clickedFeatureAdditionalInfo;
      });
    },
    {
      layerFilter: function (layerCandidate) {
        return layerCandidate.get("title") === "CentralEUCountriesGeoJSON";
      },
    }
  );
}
