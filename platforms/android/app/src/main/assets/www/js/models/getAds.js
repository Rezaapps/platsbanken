import m from "mithril";
/* eslint-disable no-undef, no-unused-vars, brace-style, max-len, padded-blocks, comma-spacing, semi, camelcase, space-before-function-paren */

const getAds = {
    api_key:
        "YidceDA1XHhlOS1ceDljXHg5ZSZceDFmQlx4Y2NTXHg5NGkkXHgwMzNXWlx4YTFceGExaic",
    url: "https://jobsearch.api.jobtechdev.se/",
    loc: "",
    job: "",
    job_id: null,

    allAds: [],
    jobAd: [],

    fetchAds: () =>
    {
        getAds.allAds = [];
        return m
            .request( {
                url:
                    getAds.url +
                    "search?q=" +
                    getAds.loc +
                    "," +
                    getAds.job
                    + "&limit=100",
                method: "GET",
                headers: {
                    "api-key": getAds.api_key,
                },
            } )
            .then( ( res ) =>
            {
                getAds.allAds.push( ...res.hits );
            } );
    },

    fetchId: () =>
    {
        return m
            .request( {
                url: getAds.url + "ad/" + getAds.job_id,
                method: "GET",
                headers: {
                    "api-key": getAds.api_key,
                },
            } )
            .then( ( res ) =>
            {
                getAds.jobAd.push( res );
            } );
    },
};

export { getAds };
