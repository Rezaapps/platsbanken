import m from "mithril";
import { layout } from "./views/layout";
import { adsTable } from "./views/adsTable";
import { home } from "./views/home";
import { adInfo } from "./views/adInfo";
import about from "./views/about";
import savedAds from "./views/savedads";
/* eslint-disable no-undef, no-unused-vars, brace-style, max-len, padded-blocks, comma-spacing, semi, camelcase, space-before-function-paren */

history.scrollRestoration = 'auto';
document.addEventListener( "deviceready", onDeviceReady, false );

function onDeviceReady ()
{
    let taps = [];
    let dblTap = false;

    document.addEventListener( "backbutton",
        function ( e )
        {
            taps.unshift( new Date().getTime() );
            if ( taps.length >= 2 )
            {
                dblTap = taps[ 0 ] - taps[ 1 ] < 1300 ? dblTap = true : dblTap = false;
            }
            if ( dblTap )
            {
                e.preventDefault();
                navigator.notification.confirm(
                    "Tap on OK to exit",
                    onConfirmExit,
                    "Do you want to exit?"
                );
            }

        },
        false
    );
}

function onConfirmExit ( button )
{
    if ( button == 1 )
    {
        navigator.app.exitApp();
    } else
    {
        console.log( '' );
    }
}

m.route( document.body, "/", {
    "/": {
        render: () =>
        {
            return m( layout, m( home ) );
        },
    },

    "/jobs/:jobads": {
        render: ( vnode ) =>
        {
            return m( layout, m( adsTable, vnode.attrs ) );
        },
    },
    "/job/:id": {
        render: ( vnode ) =>
        {
            return m( layout, m( adInfo, vnode.attrs ) );
        },
    },
    "/about": {
        render: () =>
        {
            return m( layout, m( about ) );
        },
    },
    "/my_ads": {
        render: () =>
        {
            return m( layout, m( savedAds ) );
        },
    },
}
);
