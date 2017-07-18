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
        .option('-l, --limit [limit]', 'The total number of reactions to return, defaults to 1000')
        .parse(process.argv);

if( ! program.app || ! program.secret ) {
    console.error('You must supply a Facebook App ID and Secret.'.bold.red);
    process.exit(1);
}

if( ! program.id ) {
    console.error('You must supply a post ID. Run reactionator -h for more options.'.bold.red);
    process.exit(1);
}

if( ! program.timeout ) {
    console.warn('No timeout supplied. Job will only run once.'.yellow);
}

if( program.id && program.page ) {

    var facebook = new Facebook({ appId: program.app , secret: program.secret }),
        url,
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

        if( program.limit ) {
            url = '/' + program.page + '_' + program.id + '/reactions?limit=' + program.limit;
        } else {
            url = '/' + program.page + '_' + program.id + '/reactions?limit=1000';
        }

        facebook.api( url, function( err, result ) {

            if( err ) {
                console.error( err );
                process.exit(1);
            }

            result.data.forEach(function( obj, i ) {
                output[obj.type] += 1;
            });

            console.log( output );

            delete output;

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
