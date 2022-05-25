window.onload = init;

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 6,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
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
