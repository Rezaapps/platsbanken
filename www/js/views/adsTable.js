import m from "mithril";
import { getAds } from "../models/getAds";
import { layout } from "./layout";
 
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
            // take location and job title from vnode and
            // save it in getAds
            const loc_job = vnode.attrs.jobads.split( "&" );

            getAds.loc = loc_job[ 0 ];
            getAds.job = loc_job[ 1 ];
            getAds.fetchAds();
            adsTable.datas = getAds.allAds;

            // add one more link to menu for search results page
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
            // empty ad_table first
            // then make filter and sort buttons
            // to add it first in the table
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

                            // dropdown content with eventlisteners
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
                    // sort buttons with onclick event
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

            // make a card for each anons object inside datas array
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
                        // star button with onclick event to save job ad.
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
                                        // make an object from ad-title,
                                        // workplace, deadline, anonsers name
                                        const faved = {
                                            headline: ad.headline,
                                            workplace:
                                                ad.workplace_address
                                                    .municipality,
                                            deadline: ad.application_deadline,
                                            name: ad.employer.name,
                                        };

                                        // save the created object in localstorage
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
