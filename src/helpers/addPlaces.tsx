export default function addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {
  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location,
      });

      // const li = document.createElement("li");

      // li.textContent = place.name!;
      // placesList.appendChild(li);

      // li.addEventListener("click", () => {
      //   map.setCenter(place.geometry!.location!);
      // });
    }
  }
}
