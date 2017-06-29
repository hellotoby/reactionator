#!/usr/bin/env node

var program     = require('commander'),
    colors      = require('colors'),
    Facebook    = require('facebook-node-sdk');

program.version('0.0.1')
        .option('-a --app, [app]', 'Facebook app ID')
        .option('-s --secret [secret]', 'Facebook app secret')
        .option('-p --page [page]', 'Facebook page ID')
        .option('-i, --id [id]', 'Facebook post ID')
        .option('-t, --timeout [milliseconds]', 'The number of milliseconds to watch the url.')
        .parse(process.argv);

if( ! program.app || ! program.secret ) {
    console.error('You must supply a Facebook App ID and Secret.'.bold.red);
    process.exitCode = 1;
}

if( ! program.id ) {
    console.error('You must supply a post ID. Run reactionator -h for more options.'.bold.red);
    process.exitCode = 1;
}

if( ! program.timeout ) {
    console.warn('No timeout supplied. Job will only run once.'.yellow);
}

if( program.id && program.page ) {

    var facebook = new Facebook({ appId: program.app , secret: program.secret }),
        output;

    function getResults() {

        output = {
            'NONE'      : 0,
            'LIKE'      : 0,
            'LOVE'      : 0,
            'WOW'       : 0,
            'HAHA'      : 0,
            'SAD'       : 0,
            'ANGRY'     : 0,
            'THANKFUL'  : 0,
            'PRIDE'     : 0
        };

        facebook.api('/' + program.page + '_' + program.id + '/reactions', function( err, result ) {
            if( err ) {
                console.error( err );
                process.exitCode = 1;
            }
            result.data.forEach(function( obj, i ) {
                output[obj.type] += 1;
            });
            console.log( output );
        });

    }

    if( program.timeout ) {
        setInterval(function() {
            getResults();
        }, program.timeout );
    } else {
        getResults();
        process.exit;
    }

} else {
    console.error('Facebook SDK v2.4 requires both page ID and post ID. To get your page ID visit: https://findmyfbid.com/'.bold.red);
}
