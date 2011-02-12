/**
 * This contains a list of all of the stations and their geolocation
 * information so that we can find the nearest station without making a whole
 * bunch of API calls. This data rarely changes anyways.
 */
var StationGeoLoc = {
   "16TH" : {
      "abbr" : "16TH",
      "longitude" : "-122.419478",
      "latLon" : new LatLon(37.765228, -122.419478),
      "latitude" : "37.765228",
      "name" : "16th St. Mission"
   },
   "WDUB" : {
      "abbr" : "WDUB",
      "longitude" : "-121.9281",
      "latLon" : new LatLon(37.6998, -121.9281),
      "latitude" : "37.6998",
      "name" : "West Dublin/Pleasanton"
   },
   "UCTY" : {
      "abbr" : "UCTY",
      "longitude" : "-122.017858",
      "latLon" : new LatLon(37.59120269, -122.017858),
      "latitude" : "37.59120269",
      "name" : "Union City"
   },
   "WCRK" : {
      "abbr" : "WCRK",
      "longitude" : "-122.0680181",
      "latLon" : new LatLon(37.90463888, -122.0680181),
      "latitude" : "37.90463888",
      "name" : "Walnut Creek"
   },
   "SANL" : {
      "abbr" : "SANL",
      "longitude" : "-122.1613112",
      "latLon" : new LatLon(37.72261921, -122.1613112),
      "latitude" : "37.72261921",
      "name" : "San Leandro"
   },
   "NCON" : {
      "abbr" : "NCON",
      "longitude" : "-122.025106",
      "latLon" : new LatLon(38.00257665, -122.025106),
      "latitude" : "38.00257665",
      "name" : "North Concord/Martinez"
   },
   "FTVL" : {
      "abbr" : "FTVL",
      "longitude" : "-122.2243277",
      "latLon" : new LatLon(37.77462381, -122.2243277),
      "latitude" : "37.77462381",
      "name" : "Fruitvale"
   },
   "CONC" : {
      "abbr" : "CONC",
      "longitude" : "-122.0298613",
      "latLon" : new LatLon(37.97201583, -122.0298613),
      "latitude" : "37.97201583",
      "name" : "Concord"
   },
   "WOAK" : {
      "abbr" : "WOAK",
      "longitude" : "-122.2945822",
      "latLon" : new LatLon(37.80467476, -122.2945822),
      "latitude" : "37.80467476",
      "name" : "West Oakland"
   },
   "ASHB" : {
      "abbr" : "ASHB",
      "longitude" : "-122.269946",
      "latLon" : new LatLon(37.853061, -122.269946),
      "latitude" : "37.853061",
      "name" : "Ashby"
   },
   "GLEN" : {
      "abbr" : "GLEN",
      "longitude" : "-122.4341143",
      "latLon" : new LatLon(37.73294154, -122.4341143),
      "latitude" : "37.73294154",
      "name" : "Glen Park"
   },
   "EMBR" : {
      "abbr" : "EMBR",
      "longitude" : "-122.3968132",
      "latLon" : new LatLon(37.79302244, -122.3968132),
      "latitude" : "37.79302244",
      "name" : "Embarcadero"
   },
   "CIVC" : {
      "abbr" : "CIVC",
      "longitude" : "-122.4138511",
      "latLon" : new LatLon(37.77960559, -122.4138511),
      "latitude" : "37.77960559",
      "name" : "Civic Center/UN Plaza"
   },
   "SFIA" : {
      "abbr" : "SFIA",
      "longitude" : "-122.392534",
      "latLon" : new LatLon(37.6159, -122.392534),
      "latitude" : "37.6159",
      "name" : "San Francisco Int'l Airport"
   },
   "PLZA" : {
      "abbr" : "PLZA",
      "longitude" : "-122.2992715",
      "latLon" : new LatLon(37.9030588, -122.2992715),
      "latitude" : "37.9030588",
      "name" : "El Cerrito Plaza"
   },
   "12TH" : {
      "abbr" : "12TH",
      "longitude" : "-122.271655",
      "latLon" : new LatLon(37.80309272, -122.271655),
      "latitude" : "37.80309272",
      "name" : "12th St. Oakland City Center"
   },
   "ROCK" : {
      "abbr" : "ROCK",
      "longitude" : "-122.2527315",
      "latLon" : new LatLon(37.84418385, -122.2527315),
      "latitude" : "37.84418385",
      "name" : "Rockridge"
   },
   "MLBR" : {
      "abbr" : "MLBR",
      "longitude" : "-122.386534",
      "latLon" : new LatLon(37.600006, -122.386534),
      "latitude" : "37.600006",
      "name" : "Millbrae"
   },
   "ORIN" : {
      "abbr" : "ORIN",
      "longitude" : "-122.1837911",
      "latLon" : new LatLon(37.87836087, -122.1837911),
      "latitude" : "37.87836087",
      "name" : "Orinda"
   },
   "HAYW" : {
      "abbr" : "HAYW",
      "longitude" : "-122.0880021",
      "latLon" : new LatLon(37.67038689, -122.0880021),
      "latitude" : "37.67038689",
      "name" : "Hayward"
   },
   "SHAY" : {
      "abbr" : "SHAY",
      "longitude" : "-122.0575506",
      "latLon" : new LatLon(37.63479954, -122.0575506),
      "latitude" : "37.63479954",
      "name" : "South Hayward"
   },
   "19TH" : {
      "abbr" : "19TH",
      "longitude" : "-122.2688692",
      "latLon" : new LatLon(37.80762952, -122.2688692),
      "latitude" : "37.80762952",
      "name" : "19th St. Oakland"
   },
   "PITT" : {
      "abbr" : "PITT",
      "longitude" : "-121.9419045",
      "latLon" : new LatLon(38.01893434, -121.9419045),
      "latitude" : "38.01893434",
      "name" : "Pittsburg/Bay Point"
   },
   "SSAN" : {
      "abbr" : "SSAN",
      "longitude" : "-122.44399",
      "latLon" : new LatLon(37.66433, -122.44399),
      "latitude" : "37.66433",
      "name" : "South San Francisco"
   },
   "LAKE" : {
      "abbr" : "LAKE",
      "longitude" : "-122.2654984",
      "latLon" : new LatLon(37.79760237, -122.2654984),
      "latitude" : "37.79760237",
      "name" : "Lake Merritt"
   },
   "MCAR" : {
      "abbr" : "MCAR",
      "longitude" : "-122.2671871",
      "latLon" : new LatLon(37.82840941, -122.2671871),
      "latitude" : "37.82840941",
      "name" : "MacArthur"
   },
   "BAYF" : {
      "abbr" : "BAYF",
      "longitude" : "-122.1278585",
      "latLon" : new LatLon(37.69783218, -122.1278585),
      "latitude" : "37.69783218",
      "name" : "Bay Fair"
   },
   "DALY" : {
      "abbr" : "DALY",
      "longitude" : "-122.4690807",
      "latLon" : new LatLon(37.70612055, -122.4690807),
      "latitude" : "37.70612055",
      "name" : "Daly City"
   },
   "COLS" : {
      "abbr" : "COLS",
      "longitude" : "-122.1977888",
      "latLon" : new LatLon(37.75428138, -122.1977888),
      "latitude" : "37.75428138",
      "name" : "Coliseum/Oakland Airport"
   },
   "CAST" : {
      "abbr" : "CAST",
      "longitude" : "-122.07746",
      "latLon" : new LatLon(37.69073031, -122.07746),
      "latitude" : "37.69073031",
      "name" : "Castro Valley"
   },
   "DELN" : {
      "abbr" : "DELN",
      "longitude" : "-122.3172189",
      "latLon" : new LatLon(37.92565088, -122.3172189),
      "latitude" : "37.92565088",
      "name" : "El Cerrito del Norte"
   },
   "PHIL" : {
      "abbr" : "PHIL",
      "longitude" : "-122.056847",
      "latLon" : new LatLon(37.92773627, -122.056847),
      "latitude" : "37.92773627",
      "name" : "Pleasant Hill/Contra Costa Centre"
   },
   "LAFY" : {
      "abbr" : "LAFY",
      "longitude" : "-122.1237985",
      "latLon" : new LatLon(37.89342547, -122.1237985),
      "latitude" : "37.89342547",
      "name" : "Lafayette"
   },
   "BALB" : {
      "abbr" : "BALB",
      "longitude" : "-122.4474142",
      "latLon" : new LatLon(37.72198087, -122.4474142),
      "latitude" : "37.72198087",
      "name" : "Balboa Park"
   },
   "NBRK" : {
      "abbr" : "NBRK",
      "longitude" : "-122.2838819",
      "latLon" : new LatLon(37.87402614, -122.2838819),
      "latitude" : "37.87402614",
      "name" : "North Berkeley"
   },
   "DUBL" : {
      "abbr" : "DUBL",
      "longitude" : "-121.9003525",
      "latLon" : new LatLon(37.70167362, -121.9003525),
      "latitude" : "37.70167362",
      "name" : "Dublin/Pleasanton"
   },
   "POWL" : {
      "abbr" : "POWL",
      "longitude" : "-122.4070123",
      "latLon" : new LatLon(37.784971, -122.4070123),
      "latitude" : "37.784971",
      "name" : "Powell St."
   },
   "COLM" : {
      "abbr" : "COLM",
      "longitude" : "-122.4673692",
      "latLon" : new LatLon(37.68458089, -122.4673692),
      "latitude" : "37.68458089",
      "name" : "Colma"
   },
   "MONT" : {
      "abbr" : "MONT",
      "longitude" : "-122.4014855",
      "latLon" : new LatLon(37.78933596, -122.4014855),
      "latitude" : "37.78933596",
      "name" : "Montgomery St."
   },
   "FRMT" : {
      "abbr" : "FRMT",
      "longitude" : "-121.9763954",
      "latLon" : new LatLon(37.55733428, -121.9763954),
      "latitude" : "37.55733428",
      "name" : "Fremont"
   },
   "DBRK" : {
      "abbr" : "DBRK",
      "longitude" : "-122.2680509",
      "latLon" : new LatLon(37.86986846, -122.2680509),
      "latitude" : "37.86986846",
      "name" : "Downtown Berkeley"
   },
   "RICH" : {
      "abbr" : "RICH",
      "longitude" : "-122.3534001",
      "latLon" : new LatLon(37.93716991, -122.3534001),
      "latitude" : "37.93716991",
      "name" : "Richmond"
   },
   "SBRN" : {
      "abbr" : "SBRN",
      "longitude" : "-122.415912",
      "latLon" : new LatLon(37.637143, -122.415912),
      "latitude" : "37.637143",
      "name" : "San Bruno"
   },
   "24TH" : {
      "abbr" : "24TH",
      "longitude" : "-122.418292",
      "latLon" : new LatLon(37.752411, -122.418292),
      "latitude" : "37.752411",
      "name" : "24th St. Mission"
   }
};

