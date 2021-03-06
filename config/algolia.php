<?php

/*
 * This file is part of Laravel Algolia.
 *
 * (c) Vincent Klaiber <hello@vinkla.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

    'default' => 'main',

    /*
    |--------------------------------------------------------------------------
    | Algolia Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Example
    | configuration has been included, but you may add as many connections as
    | you would like.
    |
    */

    'connections' => [

        'main' => [
            'id' => env('ALGOLIA_APP_ID', 'your-application-id'),
            'key' => env('ALGOLIA_ADMIN_API_KEY', 'your-api-key'),

            // These two are actually WhatTheTag-specific, so here goes
            // SEARCH API KEY GOES HERE
            'search_key' => env('ALGOLIA_SEARCH_API_KEY', 'your-api-key'),
            'indice_name' => env('ALGOLIA_INDICE_NAME', 'whatthetag')
        ],

        'alternative' => [
            'id' => 'your-application-id',
            'key' => 'your-api-key',
        ],

    ],

];
