io.Transport.script = io.Transport.extend({
    type: "script", 

    init: function(base, options){
        var self = this;
        this._cacheBreaker = 0;
        this.__super__(base, options);
        window.__jsonp = function() {
            self._script.parentElement.removeChild(self._script);
            self._onData.apply(self, arguments);
            self.connect.apply(self);
        }
    },
    
	connect: function(){
	   var self = this;
	   this._script = document.createElement("script");
	   this._script.src = this._prepareUrl() + "?" + this._cacheBreaker++;
	   document.body.appendChild(this._script);
	},
	
	send: function(data){
        new Image().src = this._prepareUrl() + "?data=" + encodeURIComponent(data);
	},
});

io.Transport.script.check = function(){
    return true;
}