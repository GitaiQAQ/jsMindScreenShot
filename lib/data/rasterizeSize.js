var page = require('webpage').create(),
    system = require('system');

var address = system.args[1];
var output = system.args[2];

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {

        window.setTimeout(function () {

            var MapSize = page.evaluate(function () {
                return window.mindMap.mapSize();
            });

            MapSize.width += 300;
            MapSize.height += 100;

            console.log(MapSize.width + ' ' + MapSize.height);

            page.render(output);
            phantom.exit();
        }, 1200);
    }
});
