import m from "mithril";
import { getAds } from "../models/getAds";
import { adsTable } from "./adsTable";
/* eslint-disable no-undef, no-unused-vars, brace-style, indent, max-len, padded-blocks, comma-spacing, semi, camelcase, space-before-function-paren */

const adInfo = {
    ad_data: {},
    oninit: ( vnode ) =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if ( getAds.allAds.length > 0 )
        {
            getAds.allAds.forEach( ad =>
            {
                if ( ad.id === vnode.attrs.id )
                {
                    adInfo.ad_data = {};
                    adInfo.ad_data = ad;
                }
            } );
        } else if ( getAds.allAds.length == 0 && getAds.jobAd.length > 0 )
        {
            getAds.jobAd.forEach( ad =>
            {
                if ( ad.id === vnode.attrs.id )
                {
                    adInfo.ad_data = {};
                    adInfo.ad_data = ad;
                }
            }
            );
        } else if ( getAds.allAds.length == 0 && getAds.jobAd.length == 0 )
        {
            getAds.job_id = vnode.attrs.id;
            getAds.fetchId();
            if ( getAds.jobAd.lenth > 0 )
            {
                getAds.jobAd.forEach( ad =>
                {
                    if ( ad.id === vnode.attrs.id )
                    {
                        adInfo.ad_data = {};
                        adInfo.ad_data = ad;
                    }
                }
                );
            }
        }
    },

    view: () =>
    {
        window.onhashchange = () =>
        {
            adsTable.view();
        };
        let newAd = adInfo.ad_data;
        let allReqs = [];

        Object.keys( newAd.must_have ).forEach( k =>
        {
            if ( newAd.must_have[ k ].length > 0 )
            {
                let itms = [];

                newAd.must_have[ k ].forEach( el =>
                {
                    itms.push( m( "span", "-" + el.label + "\n" ) );
                });

                let itmobj = [];
                let skilkrav = '';

                k === "work_experiences" ? skilkrav = "Arbetslivserfarenhet: " : '';
                k === "languages" ? skilkrav = "Språk: " : '';
                k === "skills" ? skilkrav = "Kompetens: " : '';

                itmobj.push( m( "p", [ m( "h6", skilkrav ), itms ] ) );
                allReqs.push( itmobj );
            }
        } )


        if ( newAd.removed == true )
        {
            return m(
                "div",
                "Anonsen har tagits bort."
            );
        } else
        {
            return m( "article.row",
                [
                    m( "div.headerInfo",
                        [
                            m( "img", { src: newAd.logo_url } ),
                            m( "h5", newAd.headline ),
                            m( "h6", newAd.employer.name ),
                            m(
                                "h6",
                                newAd.workplace_address.region +
                                ", " +
                                newAd.workplace_address.municipality
                            ),
                            m( "p", `Anställning: ${newAd.working_hours_type.label}` ),
                        ] ), // div headerInfo ends here

                    m( "div.bodyInfo",
                        [
                            m( "div.jobreq",
                                [
                                    m( "h5", "Krav: " ),
                                    m( "p", allReqs )
                                ] ),

                            m( "div", newAd.description.text ),
                            m( "div", [
                                m( "h6", "Lön: " ),
                                m( "p", newAd.salary_description ),
                                m( "p", newAd.salary_type.label ),
                                m( "h6", "Anställnings Form: " ),
                                m( "p", newAd.description.conditions ),
                                m( "p", "Ansök senast: " ),
                                m( "p", newAd.application_deadline ),
                                newAd.application_details.url == null
                                    ? m( "p", [
                                        "Ansök genom att klicka på länken: ",
                                        m(
                                            "a",
                                            {
                                                href: `mailto:${newAd.application_details.email
                                                    }?subject=Job Ad Reference: ${newAd.application_details
                                                        .reference == null
                                                        ? newAd.headline
                                                        : newAd.application_details
                                                            .reference
                                                    }&body=Job ad webpage: ${newAd.webpage_url
                                                    }`,
                                            },
                                            newAd.application_details.email
                                        ),
                                    ])
                                    : m(
                                        "a.btnlnk",
                                        {
                                            href: newAd.application_details.url,
                                            target: "_blank",
                                        },
                                        m( "span.btn.col.s12.applybtn", "Apply" )
                                    ),
                            ]),

                        ]),
                ]);
        }
    }
};

export { adInfo };
