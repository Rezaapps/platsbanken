import m from "mithril";

const getAds = {
    api_key:
        "YidceDA1XHhlOS1ceDljXHg5ZSZceDFmQlx4Y2NTXHg5NGkkXHgwMzNXWlx4YTFceGExaic",
    url: "https://jobsearch.api.jobtechdev.se/",
    loc: "",
    job: "",
    job_id: null,

    allAds: [],
    jobAd: [],

    // fetch all ads that matches search
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

    // fetch specefic ad with id
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
