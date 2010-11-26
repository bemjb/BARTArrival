/**
 * This contains a list of all of the stations and their geolocation
 * information so that we can find the nearest station without making a whole
 * bunch of API calls. This data rarely changes anyways.
 */
var StationGeoLoc = {
   "16TH" : {
      "abbr" : "16TH",
      "latLon": new LatLon(37.765228, -122.419478),
      "name" : "16th St. Mission"
   },
   "UCTY" : {
      "abbr" : "UCTY",
      "latLon": new LatLon(37.59120269, -122.017858),
      "name" : "Union City"
   },
   "WCRK" : {
      "abbr" : "WCRK",
      "latLon": new LatLon(37.90463888, -122.0680181),
      "name" : "Walnut Creek"
   },
   "SANL" : {
      "abbr" : "SANL",
      "latLon": new LatLon(37.72261921, -122.1613112),
      "name" : "San Leandro"
   },
   "NCON" : {
      "abbr" : "NCON",
      "latLon": new LatLon(38.00257665, -122.025106),
      "name" : "North Concord/Martinez"
   },
   "FTVL" : {
      "abbr" : "FTVL",
      "latLon": new LatLon(37.77462381, -122.2243277),
      "name" : "Fruitvale"
   },
   "CONC" : {
      "abbr" : "CONC",
      "latLon": new LatLon(37.97201583, -122.0298613),
      "name" : "Concord"
   },
   "WOAK" : {
      "abbr" : "WOAK",
      "latLon": new LatLon(37.80467476, -122.2945822),
      "name" : "West Oakland"
   },
   "ASHB" : {
      "abbr" : "ASHB",
      "latLon": new LatLon(37.853061, -122.269946),
      "name" : "Ashby"
   },
   "GLEN" : {
      "abbr" : "GLEN",
      "latLon": new LatLon(37.73294154, -122.4341143),
      "name" : "Glen Park"
   },
   "EMBR" : {
      "abbr" : "EMBR",
      "latLon": new LatLon(37.79302244, -122.3968132),
      "name" : "Embarcadero"
   },
   "CIVC" : {
      "abbr" : "CIVC",
      "latLon": new LatLon(37.77960559, -122.4138511),
      "name" : "Civic Center"
   },
   "SFIA" : {
      "abbr" : "SFIA",
      "latLon": new LatLon(37.6159, -122.392534),
      "name" : "San Francisco Int'l Airport"
   },
   "PLZA" : {
      "abbr" : "PLZA",
      "latLon": new LatLon(37.9030588, -122.2992715),
      "name" : "El Cerrito Plaza"
   },
   "12TH" : {
      "abbr" : "12TH",
      "latLon": new LatLon(37.80309272, -122.271655),
      "name" : "12th St. Oakland City Center"
   },
   "ROCK" : {
      "abbr" : "ROCK",
      "latLon": new LatLon(37.84418385, -122.2527315),
      "name" : "Rockridge"
   },
   "MLBR" : {
      "abbr" : "MLBR",
      "latLon": new LatLon(37.600006, -122.386534),
      "name" : "Millbrae"
   },
   "ORIN" : {
      "abbr" : "ORIN",
      "latLon": new LatLon(37.87836087, -122.1837911),
      "name" : "Orinda"
   },
   "HAYW" : {
      "abbr" : "HAYW",
      "latLon": new LatLon(37.67038689, -122.0880021),
      "name" : "Hayward"
   },
   "SHAY" : {
      "abbr" : "SHAY",
      "latLon": new LatLon(37.63479954, -122.0575506),
      "name" : "South Hayward"
   },
   "19TH" : {
      "abbr" : "19TH",
      "latLon": new LatLon(37.80762952, -122.2688692),
      "name" : "19th St. Oakland"
   },
   "PITT" : {
      "abbr" : "PITT",
      "latLon": new LatLon(38.01893434, -121.9419045),
      "name" : "Pittsburg/Bay Point"
   },
   "SSAN" : {
      "abbr" : "SSAN",
      "latLon": new LatLon(37.66433, -122.44399),
      "name" : "South San Francisco"
   },
   "LAKE" : {
      "abbr" : "LAKE",
      "latLon": new LatLon(37.79760237, -122.2654984),
      "name" : "Lake Merritt"
   },
   "MCAR" : {
      "abbr" : "MCAR",
      "latLon": new LatLon(37.82840941, -122.2671871),
      "name" : "MacArthur"
   },
   "BAYF" : {
      "abbr" : "BAYF",
      "latLon": new LatLon(37.69783218, -122.1278585),
      "name" : "Bay Fair"
   },
   "DALY" : {
      "abbr" : "DALY",
      "latLon": new LatLon(37.70612055, -122.4690807),
      "name" : "Daly City"
   },
   "COLS" : {
      "abbr" : "COLS",
      "latLon": new LatLon(37.75428138, -122.1977888),
      "name" : "Coliseum/Oakland Airport"
   },
   "CAST" : {
      "abbr" : "CAST",
      "latLon": new LatLon(37.69073031, -122.07746),
      "name" : "Castro Valley"
   },
   "DELN" : {
      "abbr" : "DELN",
      "latLon": new LatLon(37.92565088, -122.3172189),
      "name" : "El Cerrito del Norte"
   },
   "PHIL" : {
      "abbr" : "PHIL",
      "latLon": new LatLon(37.92773627, -122.056847),
      "name" : "Pleasant Hill"
   },
   "LAFY" : {
      "abbr" : "LAFY",
      "latLon": new LatLon(37.89342547, -122.1237985),
      "name" : "Lafayette"
   },
   "BALB" : {
      "abbr" : "BALB",
      "latLon": new LatLon(37.72198087, -122.4474142),
      "name" : "Balboa Park"
   },
   "NBRK" : {
      "abbr" : "NBRK",
      "latLon": new LatLon(37.87402614, -122.2838819),
      "name" : "North Berkeley"
   },
   "DUBL" : {
      "abbr" : "DUBL",
      "latLon": new LatLon(37.70167362, -121.9003525),
      "name" : "Dublin/Pleasanton"
   },
   "POWL" : {
      "abbr" : "POWL",
      "latLon": new LatLon(37.784971, -122.4070123),
      "name" : "Powell St."
   },
   "COLM" : {
      "abbr" : "COLM",
      "latLon": new LatLon(37.68458089, -122.4673692),
      "name" : "Colma"
   },
   "MONT" : {
      "abbr" : "MONT",
      "latLon": new LatLon(37.78933596, -122.4014855),
      "name" : "Montgomery St."
   },
   "FRMT" : {
      "abbr" : "FRMT",
      "latLon": new LatLon(37.55733428, -121.9763954),
      "name" : "Fremont"
   },
   "DBRK" : {
      "abbr" : "DBRK",
      "latLon": new LatLon(37.86986846, -122.2680509),
      "name" : "Downtown Berkeley"
   },
   "RICH" : {
      "abbr" : "RICH",
      "latLon": new LatLon(37.93716991, -122.3534001),
      "name" : "Richmond"
   },
   "SBRN" : {
      "abbr" : "SBRN",
      "latLon": new LatLon(37.637143, -122.415912),
      "name" : "San Bruno"
   },
   "24TH" : {
      "abbr" : "24TH",
      "latLon": new LatLon(37.752411, -122.418292),
      "name" : "24th St. Mission"
   }
};
