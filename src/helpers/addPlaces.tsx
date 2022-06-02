import alltrails_marker from "images/alltrails_marker.png";

export default function addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {
  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: alltrails_marker,
        size: new google.maps.Size(55, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(20, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location,
      });
    }
  }
}
