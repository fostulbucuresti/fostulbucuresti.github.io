L.Control.InfoButton = L.Control.extend({
    options: {
        position: 'topleft',
        title:'<h1>Leaflet</h1>',
        linkTitle:'Info',
        html: '<font face="sans-serif"> Sursele fotografiilor aeriene: <ul style="list-style: square;">   <li><b>1927</b> - Compagnie aérienne française, Biblioteca Academiei, obținute prin amabilitatea lui <a href="http://www.costingheorghe.ro/thenow/" target="_blank">Costin Gheorghe</a></li>   <li><b>1938, vara</b> - Zboruri de recunoaștere Luftwaffe, National Archives, SUA, obținute prin amabilitatea lui John Calvin</li>   <li><b>1943, 19 august</b> - Zboruri de recunoaștere ale escadrilei <a href="http://www.saairforce.co.za/the-airforce/squadrons/12/60-squadron" target="_blank">60 SAAF</a> (South African Air Force), US Air Force Historical Research Center, scanate de către <a href="http://www.low-level-ploesti.org/" target="_blank">Col. David H. Klaus, USAF, Retired</a>. Obținute prin amabilitatea lui <a href="http://macristudio.com" target="_blank">Ionuț Macri</a>.</li>   <li><b>1966, 12 iulie</b> - Programul de sateliți de spionaj <a href="https://en.wikipedia.org/wiki/Corona_(satellite)" target="_blank"> Corona (KH-4A)</a>, U.S. Geological Survey, obținute prin amabilitatea lui Ionuț Sandric</li>   <li><b>1978, 30 martie</b> - Programul sateliți de spionaj <a href="https://en.wikipedia.org/wiki/KH-9_HexagonKH-9 (Hexagon)" target="_blank"> Hexagon (KH-9)</a>, U.S. Geological Survey, </li> </ul> Contact: fostulbucuresti@gmail.com </font>',
        show: false
    },

    onAdd: function (map) {
        this.container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-info-button', this.container);
        this.link.href = '#';
        this.link.title = this.options.linkTitle;
        this.link.innerHTML = "<center><em>i</em></center>";
        L.DomEvent.on(this.link, 'click', this._click, this);


        this.infoWindowContainer = L.DomUtil.create('div', 'leaflet-infoWindow-container', this._map._container);
        this.infoWindowBlack = L.DomUtil.create('div', 'leaflet-infoWindow-black', this.infoWindowContainer);
        this.infoWindow = L.DomUtil.create('div', 'leaflet-infoWindow', this.infoWindowContainer);

        L.DomEvent.on(this.infoWindowContainer, 'click', this._click, this);
        L.DomEvent.on(this.infoWindow, 'click', this._stopClick, this);
        this.title = L.DomUtil.create('div', 'leaflet-title', this.infoWindow);
        this.title.innerHTML = this.options.title;
        this.content = L.DomUtil.create('div', 'leaflet-content', this.infoWindow);
        this.content.innerHTML = this.options.html;
        L.DomEvent.disableClickPropagation(this.infoWindow);
        L.DomEvent.disableClickPropagation(this.infoWindow);
        if (this.options.show) this._showInfo();
        return this.container;
    },
    _stopClick: function(e) {
        L.DomEvent.stopPropagation(e);
    },

    _click: function (e) {
        if (this.options.show == true) {
            this._hideInfo();
        } else {
            this._showInfo();
        }
    },
    _showInfo: function () {
        this.infoWindowContainer.style.display ="block";

        this.infoWindowBlack.style.animation ="showInfoContainer 0.2s";
        this.infoWindowBlack.style.webkitAnimationName ="showInfoContainer 0.2s";
        this.infoWindowBlack.style.opacity ="1";

        this.infoWindow.style.animation ="showInfo 0.5s";
        this.infoWindow.style.webkitAnimationName ="showInfo 0.5s";
        this.infoWindow.style.top ="10%";
        this.options.show = true;
        this._map.dragging.disable();
        this._map.touchZoom.disable();
        this._map.doubleClickZoom.disable();
        this._map.scrollWheelZoom.disable();
    },
    _hideInfo: function () {
        this.infoWindowBlack.style.animation ="hideInfoContainer 0.2s";
        this.infoWindowBlack.style.webkitAnimationName ="hideInfoContainer 0.2s";
        this.infoWindowBlack.style.opacity ="0";

        this.infoWindow.style.animation ="hideInfo 0.5s";
        this.infoWindow.style.webkitAnimationName ="hideInfo 0.5s";
        this.infoWindow.style.top ="-100%";
        
        var _this =this;
        setTimeout(function (){_this.infoWindowContainer.style.display ="none";},500);
        this.options.show = false;
        this._map.dragging.enable();
        this._map.touchZoom.enable();
        this._map.doubleClickZoom.enable();
        this._map.scrollWheelZoom.enable();
    }
});

L.control.infoButton = function(options) {
  var newControl = new L.Control.InfoButton(options);
  return newControl;
};