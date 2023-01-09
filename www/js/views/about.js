import m from "mithril";
/* eslint-disable no-undef, no-unused-vars, brace-style, max-len, padded-blocks, comma-spacing, semi, camelcase, space-before-function-paren */

const about = {
    view: () =>
    {
        return m( "div", [
            m( "h3", "Jobify, Find your ideal jobs" ),
            m( "m", "*** Assignment 10 from webapp course ***" ),
            m( "p", "By Reza (rere20)" ),
            m( "a", { href: "https://github.com/rez433" }, "Github: rez433" ),
            m( "br" ),
            m(
                "p",
                "Changing job is easier than you may think and it comes with great benefits like"
                + "higher salary, new career posibilites and networking."
            ),
            m( "p", "Jobify will help you find your ideal job." ),
            m( "p", "Testomonies: " ),
            m( "img", { src: "./img/borat.jpg" } ),
        ] );
    },
};

export default about;
