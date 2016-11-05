google.maps.event.addDomListener(window, 'load', function() {

    var userLocation = new google.maps.LatLng(dataModel.locations[0].lat, dataModel.locations[0].lon);
    dataModel.mapOptions.center = userLocation;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var newLatLon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            dataModel.userLocation = newLatLon;
            dataModel.nearestLocations = [];
            MapUtility.calcNearestLocations();
            dataModel.currentLocation = dataModel.locations[0];
            dataModel.currentLocation = dataModel.nearestLocations[0].location;
            var nearestLocationLatLon = new google.maps.LatLng(dataModel.nearestLocations[0].location.lat, dataModel.nearestLocations[0].location.lon);
            dataModel.map.setCenter(nearestLocationLatLon);
        }, function() {
            dataModel.currentLocation = dataModel.locations[0];
            MapUtility.calcNearestLocations();
        });
    } else {
        dataModel.currentLocation = dataModel.locations[0];
        MapUtility.calcNearestLocations();
    }

    dataModel.map = new google.maps.Map(document.getElementById('map-canvas'), dataModel.mapOptions);
    dataModel.locations.forEach(function(location, index) {
        var locationPosition = new google.maps.LatLng(location.lat, location.lon);
        var marker = new google.maps.Marker({
            position: locationPosition,
            map: dataModel.map,
            title: location.address,
        });
        var mapLabel = new MapLabel({
            text: "",
            position: locationPosition,
            map: dataModel.map,
            fontSize: 12,
            align: 'center',
            fontColor: '#fff',
            strokeWeight: 0,

        });
        mapLabel.set('position', locationPosition);
        marker.bindTo('map', mapLabel);
        marker.bindTo('position', mapLabel);

        marker.addListener('click', function() {
            var position = marker.getPosition();
            var lat = Math.round(position.lat() * 100000) / 100000;
            var lon = Math.round(position.lng() * 100000) / 100000;

            var newLatLon = new google.maps.LatLng(lat, lon);
            dataModel.currentLocation = location;
            dataModel.nearestLocations = [];
            dataModel.userLocation = {};
            MapUtility.calcNearestLocations();
            dataModel.map.setCenter(newLatLon);

            $('html, body').animate({
                scrollTop: $("#google-map").offset().top
            }, 500);
        });

    });
});


var dataModel = {
    mapKey: '',
    locations: [{
        lat: 41.308273,
        lon: -72.927887,
        place: "New Haven, CT",
        address: '1th Street, New Haven, CT 12345',
        phone: '(123) 155-5555',
        cityLabel: 'New Haven, CT'
    }, {
        lat: 42.361145,
        lon: -71.057083,
        place: "Boston, MA",
        address: '2th Street, Boston, MA 12345',
        phone: '(123) 255-5555',
        cityLabel: 'Boston, MA'
    }, {
        lat: 25.761681,
        lon: -80.191788,
        place: "Miami, FL",
        address: '3th Street, Miami, FL 12345',
        phone: '(123) 355-5555',
        cityLabel: 'Miami, FL'
    }, {
        lat: 37.935757,
        lon: -122.347748,
        place: "Richmond, CA",
        address: '4th Street, Richmond, CA 12345',
        phone: '(123) 455-5555',
        cityLabel: 'Richmond, CA'
    }, {
        lat: 39.952583,
        lon: -75.165222,
        place: "Philadelphia, PA",
        address: '5th Street, Philadelphia, PA 12345',
        phone: '(123) 555-5555',
        cityLabel: 'Philadelphia, PA'
    }],
    map: {},
    mapOptions: {
        zoom: 15,
        draggable: !("ontouchend" in document),
        disableDefaultUI: true,
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#ff6a6a"
            }, {
                "lightness": "0"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ee3123"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ee3123"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ee3123"
            }, {
                "lightness": "62"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "lightness": "75"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "transit.station.bus",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "transit.station.rail",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [{
                "weight": "0.01"
            }, {
                "hue": "#ff0028"
            }, {
                "lightness": "0"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#80e4d8"
            }, {
                "lightness": "25"
            }, {
                "saturation": "-23"
            }]
        }]
    },
    address: '',
    nearestLocations: [],
    nearestLocationsCount: 0,
    currentLocation: {},
    userLocation: {},
    searchFilter: {
        MIN_NUM_ITEMS_TO_SHOW: 3,
        MAX_NUM_ITEMS_TO_SHOW: -1,
        range: 1000,
        buttonText: 'SEE MORE',
        numItemsToShow: 3
    }
}


var appVM = new Vue({
    el: '#google-map',
    data: dataModel,
    watch: {
        'currentLocation': {
            handler: function(val, oldVal) {
                $('.location-item.bounce-transition').addClass("bounce-enter").delay(1000).queue(function(next) {
                    $(this).removeClass("bounce-enter");
                    next();
                });
                $('.fade-transition').addClass("fade-enter").delay(1000).queue(function(next) {
                    $(this).removeClass("fade-enter");
                    next();
                });
            },
            deep: true
        }
    },
    methods: {
        changeLocation: function(location, event) {
            this.searchFilter.hideAnimation = true;
            var newLatLon = new google.maps.LatLng(location.lat, location.lon);
            this.currentLocation = location;
            this.nearestLocations = [];
            this.userLocation = {};
            MapUtility.calcNearestLocations();
            this.map.setCenter(newLatLon);
            $('html, body').animate({
                scrollTop: $("#google-map").offset().top
            }, 500);

        },
        filterRange: function(location) {
            if (this.currentLocation.place == location.location.place) {
                return false;
            }

            return true; //location.distance <= MapUtility.convertMilesToMeters(this.searchFilter.range);
        },
        seeMore: function() {
            if (this.searchFilter.numItemsToShow == this.searchFilter.MAX_NUM_ITEMS_TO_SHOW) {
                this.searchFilter.numItemsToShow = this.searchFilter.MIN_NUM_ITEMS_TO_SHOW;
                this.searchFilter.buttonText = 'SEE MORE';
            } else {
                this.searchFilter.numItemsToShow = this.searchFilter.MAX_NUM_ITEMS_TO_SHOW;
                this.searchFilter.buttonText = 'SEE FEWER';
            }
        },
        findLocation: function() {
            if (!_.isEmpty(this.address)) {
                $('.icon-search.bounce-transition').addClass("bounce-enter").delay(1000).queue(function(next) {
                    $(this).removeClass("bounce-enter");
                    next();
                });

                var self = this;
                $.ajax({
                    url: "https://maps.googleapis.com/maps/api/geocode/json",
                    data: {
                        address: this.address,
                        key: dataModel.mapKey,
                    },
                    dataType: 'json',
                    success: function(result) {
                        if (result.results.length > 0) {
                            var lat = result.results[0].geometry.location.lat;
                            var lon = result.results[0].geometry.location.lng;
                            var newLatLon = new google.maps.LatLng(lat, lon);
                            self.userLocation = newLatLon;
                            self.nearestLocations = [];
                            MapUtility.calcNearestLocations();
                            var nearestLocationLatLon = new google.maps.LatLng(dataModel.nearestLocations[0].location.lat, dataModel.nearestLocations[0].location.lon);
                            self.map.setCenter(nearestLocationLatLon);
                            self.currentLocation = self.nearestLocations[0].location;
                            $('html, body').animate({
                                scrollTop: $("#google-map").offset().top
                            }, 500);
                        }
                    }
                });
            }
        }
    }
})