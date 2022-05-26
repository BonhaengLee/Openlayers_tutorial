window.onload = init;

function init() {
  const fullScreenControl = new ol.control.FullScreen();
  const mousePositionControl = new ol.control.MousePosition();
  const overviewMapControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
  });
  const scaleLineControl = new ol.control.ScaleLine();
  const zoomSliderControl = new ol.control.ZoomSlider();
  const zoomToExtentControl = new ol.control.ZoomToExtent();

  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 6,
      rotation: 0,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
    controls: ol.control
      .defaults()
      .extend([
        fullScreenControl,
        mousePositionControl,
        overviewMapControl,
        scaleLineControl,
        zoomSliderControl,
        zoomToExtentControl,
      ]),
  });

  const popupContainerElement = document.getElementById("popup-coordinates");
  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: "center-left",
  });

  map.addOverlay(popup);

  map.on("click", (e) => {
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerElement.innerHTML = clickedCoordinate;
  });

  /* DragRotate Interaction */
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.doubleClick,
  });

  map.addInteraction(dragRotateInteraction);

  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
    freehand: true,
  });

  map.addInteraction(drawInteraction);

  drawInteraction.on("drawend", (e) => {
    const parser = new ol.format.GeoJSON();
    const drawnFeatures = parser.writeFeatures(e.feature);
    console.log(drawnFeatures);
  });
}
