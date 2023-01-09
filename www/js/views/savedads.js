import m from "mithril";
import { getAds } from "../models/getAds";

const savedAds = {
    datas: {},
    ad_table: [],

    oninit: () =>
    {

        // check if there is a saved anons in localstorage
        // so make take anons id and make a new request
        // to avoid showing dated/deleted job ads
        Object.keys( localStorage ).forEach( ( ad ) =>
        {
            savedAds.datas[ ad ] = JSON.parse( localStorage[ ad ] );
            let adId = ad.replace( "ad", "" );

            getAds.job_id = adId;
            getAds.fetchId();
        } );
    },

    view: () =>
    {
        window.onhashchange = () =>
        {
            savedAds.view();
        };

        // if there is saved anons so make a card for every job ad
        // with a link to direct user to ad page
        if ( savedAds.datas )
        {
            savedAds.ad_table = [];
            let ads = savedAds.datas;
            let adsDiv = savedAds.ad_table;

            Object.keys( ads ).forEach( ( ad ) =>
            {
                let adId = ad.replace( "ad", "" );

                adsDiv.push(
                    m( "div.jobad", [
                        m(
                            "span.material-icons.star.faved",
                            {
                                onclick: () =>
                                {
                                    Object.keys( ads ).forEach( ( id ) =>
                                    {
                                        id == ad ? delete ads[ id ] : "";
                                    } );
                                    localStorage.removeItem( ad );
                                },
                            },
                            "star"
                        ),
                        m(
                            "h5.jobtitle",
                            m( "a", { href: `#!/job/${adId}` }, ads[ ad ].headline )
                        ),
                        m( "p", [
                            m( "span", ads[ ad ].workplace ),
                            m( "br" ),
                            m( "span", ads[ ad ].name ),
                            m( "br" ),
                            m( "span", [ "DeadLine: " + ads[ ad ].deadline ] ),
                        ] ),
                    ] )
                );
            } );
        } else
        {
            m( "p", "You have no saved job ads yet!" );
        }

        return m( "article", savedAds.ad_table );
    },
};

export default savedAds;
