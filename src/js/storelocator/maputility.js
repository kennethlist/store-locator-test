var MapUtility = {
    convertMetersToMiles: function(meters) {
        return meters * 0.000621371192;
    },
    convertMilesToMeters: function(miles) {
        return miles * 1609.344;
    },
    calcDistance: function(startPositionLatLon, endPositionLatLon) {
        return google.maps.geometry.spherical.computeDistanceBetween(
            startPositionLatLon,
            endPositionLatLon
        );
    },
    calcNearestLocations: function() {
        var count = 0;
        dataModel.locations.forEach(function(location, index) {
            var startLocation = new google.maps.LatLng(dataModel.currentLocation.lat, dataModel.currentLocation.lon);
            if (!_.isEmpty(dataModel.userLocation)) {
                startLocation = dataModel.userLocation;
            }

            distance = MapUtility.calcDistance(
                startLocation,
                new google.maps.LatLng(location.lat, location.lon)
            );

            var newDistanceLocation = {
                index: count++,
                distance: distance,
                location: location
            }
            var index = _.sortedIndex(dataModel.nearestLocations, newDistanceLocation, 'distance');
            dataModel.nearestLocations.splice(index, 0, newDistanceLocation);
        })

    }
}
