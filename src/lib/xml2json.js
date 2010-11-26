var XML2JSON = function() { };
XML2JSON.convert = function(xmlDoc) {
    function iter(xml) {
        if (xml.childNodes.length == 1 && xml.firstChild.nodeName == "#text") {
            return xml.textContent;
        }
        else {
            var json = {};
            for (var i=0; i<xml.childNodes.length; i++) {
                var child = xml.childNodes[i];
                if (json[child.nodeName]) {
                    json[child.nodeName].push(iter(child));
                }
                else {
                    json[child.nodeName] = [ iter(child) ];
                }
            }
            return json;
        }
    }
    return iter(xmlDoc);
};
