module.exports = (function () {

    var schemes = {
        "base" : [
            "00bb3f", "238c47", "007929", "37dd6f", "63dd8d",
            "0f4fa8", "284c7e", "05316d", "4380d3", "6996d3",
            "ff9f00", "bf8930", "a66800", "ffb740", "ffca73",
            "ff2800", "bf4630", "a61a00", "ff5d40", "ff8973"
        ],
        "cozy": [
          'ead1ad',
          'fbf0c2',
          '3cd7c3',
          '8FBAff',
          'B4AED9',
          '78dc9a',
          '8DED2A',
          '8eecB9',
          'bbcaA9',
          'cdb19b',
          'ec7e63',
          '8cec56',
          'ffb1be',
          'DD99CE',
          'E26987',
          '8CB1FF',
          'f5dd16',
          'f1fab8',
          'ffbe56',
          '6EE1C8',
          'C4BEE9',
          '59C1ef',
          'EC7E63',
          '8BEE8C'
        ]
    };

    function hashCode(str) {
        var h, i, len, max;

        h = 0;
        max = Math.pow(2, 32);

        for (i = 0, len = str.length; i < len; i++) {
            h = (h * 31 + str.charCodeAt(i)) % max;
        }

        return h;
    }

    function getColor(str, name) {
        var scheme, hash;

        scheme = schemes[name] || schemes.base;
        hash = hashCode(str);

        return "#" + scheme[hash % scheme.length];
    }

    function addScheme(name, scheme) {
        schemes[name] = scheme;
    }

    function getScheme(name) {
        return scheme[name];
    }

    function deleteScheme(name) {
        if (name !== "base") {
            delete schemes[name];
        }
    }

    return {
        "addScheme" : addScheme,
        "getScheme" : getScheme,
        "deleteScheme" : deleteScheme,

        "getHash" : hashCode,
        "getColor" : getColor
    }

}());
