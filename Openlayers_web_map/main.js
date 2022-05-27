window.onload = init;

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 0,
      extent: [
        13957035.119643355, 3886409.4235566747, 14705484.243172048,
        4686912.891080462,
      ],
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
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
        visible: true,
        extent: [
          13957035.119643355, 3886409.4235566747, 14705484.243172048,
          4686912.891080462,
        ],
        opacity: 0.5,
      }),
    ],
  });
  map.addLayer(layerGroup);

  map.on("click", (e) => {
    console.log(e.coordinate);
  });
}
