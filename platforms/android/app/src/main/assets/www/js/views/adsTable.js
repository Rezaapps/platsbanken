import m from "mithril";
import { getAds } from "../models/getAds";
import { layout } from "./layout";
/* eslint-disable no-undef, no-unused-vars, brace-style, max-len, padded-blocks, comma-spacing, semi, camelcase, space-before-function-paren */

function fltr ( elm )
{
    if ( elm != 'allanonser' )
    {
        adsTable.fltrd = true;
        adsTable.datas = [];
        getAds.allAds.forEach( ad =>
        {
            if ( ad[ elm ] == null )
            {
                adsTable.datas.push( ad );
            }
        }
        );
    } else if ( elm == 'allanonser' )
    {
        // adsTable.fltrd == false;
        adsTable.datas = [];
        adsTable.datas = getAds.allAds;
    }
}

const adsTable = {
    datas: [],
    ad_table: [],
    fltrd: false,

    oninit: ( vnode ) =>
    {
        if ( adsTable.fltrd == false )
        {
            const loc_job = vnode.attrs.jobads.split( "&" );

            getAds.loc = loc_job[ 0 ];
            getAds.job = loc_job[ 1 ];
            getAds.fetchAds();
            adsTable.datas = getAds.allAds;
            layout.menu.length == 3
                ? layout.menu.push( {
                    lnk: `jobs/${getAds.loc}&${getAds.job}`,
                    icon: "work",
                    title: "JOBS LIST",
                } )
                : ""
            ;
        }
    },

    view: () =>
    {
        window.onhashchange = () =>
        {
            adsTable.view();
        };

        if ( adsTable.datas.length > 0 )
        {
            adsTable.ad_table = [];
            adsTable.ad_table.push(
                m( "div.sorting#sortDiv.row", [
                    m( "div.dropdown",
                        [
                            m( "span.btn.dropbtn", {
                                onclick: () =>
                                {
                                    document.querySelector( "#dropy" ).classList.toggle( "show" );
                                }
                            }, [ "Filter",
                                m( "span.badge", adsTable.datas.length )
                            ] ),
                            m( "div#dropy.dropcontent",
                                {
                                    onclick: ( e ) =>
                                    {
                                        fltr( e.target.id );
                                    }
                                },
                                [
                                    m( "span#allanonser", "Alla anonser" ),
                                    m( "span#driving_license", "Utan Krav på Körkort" ),
                                    m( "span#work_experiences", "Utan Krav på Arbetslivserfaranhet" ),
                                ],
                            )
                        ]
                    ),
                    m(
                        "span#relevance.btn",
                        {
                            onclick: () =>
                            {
                                adsTable.datas.sort( ( a, b ) =>
                                {
                                    return b.relevance - a.relevance;
                                } );
                            },
                        },
                        "Relevant"
                    ),
                    m(
                        "span#pubdate.btn",
                        {
                            onclick: () =>
                            {
                                adsTable.datas.sort( ( a, b ) =>
                                {
                                    return b.timestamp - a.timestamp;
                                } );
                            },
                        },
                        "Datum"
                    ),
                ])
            );
            adsTable.datas.forEach( ( ad ) =>
            {
                adsTable.ad_table.push(
                    // getting all ads and making them as card with link to ads webpage
                    m( "div.jobad", {
                        id: `ad${ad.id}`, onclick: ( e ) =>
                        {
                            layout.backtodiv = e.target.offsetTop;
                        }
                    }, [
                        m(
                            "span.material-icons.star",
                            {
                                class: Object.keys( localStorage ).includes(
                                    "ad" + ad.id
                                )
                                    ? "faved"
                                    : "",
                                onclick: ( e ) =>
                                {
                                    e.target.classList.toggle( "faved" );
                                    if (
                                        Object.keys( localStorage ).includes(
                                            "ad" + ad.id
                                        )
                                    )
                                    {
                                        localStorage.removeItem( "ad" + ad.id );
                                    } else
                                    {
                                        const faved = {
                                            headline: ad.headline,
                                            workplace:
                                                ad.workplace_address
                                                    .municipality,
                                            deadline: ad.application_deadline,
                                            name: ad.employer.name,
                                        };

                                        localStorage.setItem(
                                            "ad" + ad.id,
                                            JSON.stringify( faved )
                                        );
                                    }
                                },
                            },
                            "star"
                        ),
                        m(
                            "h5.jobtitle",
                            m( "a", { href: `#!/job/${ad.id}` }, ad.headline )
                        ),
                        m( "p", [
                            m(
                                "span",
                                ad.employer.name + ", " + ad.employer.workplace
                            ),
                            m( "br" ),
                            m( "span", ad.occupation.label ),
                            m( "br" ),

                            m( "span", "Publicerad: " + ad.publication_date ),
                        ] ),
                    ] )
                );
            } );
        }

        return m( "article.row", adsTable.ad_table );
    },
};

export { adsTable };
