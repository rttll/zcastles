'use strict';

var google, search, map, marker;

function onPlaceChanged() {
    var place = search.getPlace();
    var ll = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
    map.setCenter(ll)
    marker.setMap(map)
    marker.setPosition(map.getCenter())
}

function mapContainsMarker() {
    return map.getBounds().contains(marker.getPosition())
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.758868753957636,
            lng: -122.43455562331151
        },
      zoom: 16,
      disableDefaultUI: true
    });
    map.addListener('click', function(evt) {
        console.log(evt.latLng.lat())
    })

    // this will cover all map changes
    map.addListener('bounds_changed', function() {
        console.log(mapContainsMarker())
    })
    map.addListener('zoom_changed', function() {
        console.log('zoomend')
    })
    map.addListener('dragstart', function() {
        console.log('dragstart')
    })
    search = new google.maps.places.Autocomplete(
        document.getElementById('search'), {
            fields: ['formatted_address', 'geometry'],
            componentResctrictions: {'country': 'us'}
        }
    )
    search.addListener('place_changed', function() {
        marker.setMap(null)
        onPlaceChanged()
    });

    let markerInfo = new google.maps.InfoWindow({
        content: 'Castle Dracula'
    })
    marker = new google.maps.Marker({
        position: map.getCenter(),
        fillColor: 'blue',
        title: 'castle Dracula',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
        },
        map: map
    })
    marker.addListener('click', function() {
        markerInfo.open(map, marker)
    })

}
