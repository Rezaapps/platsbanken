import m from "mithril";

let layout = {

    // function to handle clicks on back button inside app
    // and animate the page change
    backbtnhandle: () =>
    {
        if ( window.location.hash != "" && window.location.hash != "#!" )
        {
            window.history ? window.history.go( -1 ) : "";

            document.querySelector( "#opcls" ).classList.add( "slide-out" );
            return new Promise( ( resolve ) =>
            {
                setTimeout( () =>
                {
                    document.querySelector( "#opcls" ).classList.remove( "slide-out" );
                    document.body.scrollTop = layout.backtodiv;
                    document.documentElement.scrollTop = layout.backtodiv;
                    resolve();
                }, 400 );
            } );

        }
    },

    backtodiv: 0,
    oninit: () =>
    {
        document.addEventListener( 'DOMContentLoaded', function ()
        {
            var elems = document.querySelectorAll( '.sidenav' );
            var instances = M.Sidenav.init( elems );
        } );

        document.addEventListener( "backbutton", onBackKeyDown, false );

        function onBackKeyDown ()
        {
            layout.backbtnhandle();
        }
    },

    menu: [
        { lnk: "", icon: "home", title: "SEARCH" },
        { lnk: "about", icon: "info", title: "ABOUT" },
        { lnk: "my_ads", icon: "bookmark_added", title: "Favorites" },
    ],

    view: ( vnode ) =>
    {
        onhashchange = ( vnode ) =>
        {
            document.querySelector( "#opcls" ).classList.add( "slide-in" );
            return new Promise( ( resolve ) =>
            {
                setTimeout( () =>
                {
                    document.querySelector( "#opcls" ).classList.remove( "slide-in" );
                    resolve();
                }, 400 );
            } );
        };

        const menubar = [];

        layout.menu.forEach( ( el ) =>
        {
            menubar.push(
                m(
                    "li",
                    m( "a.lnktxt", { href: "#!/" + el.lnk, title: el.title }, [
                        m( "i.material-icons", el.icon ),
                        m( "span", el.title ),
                    ] )
                )
            );
        } );

        return m( "main", {
            // close dropdown menu if it is clicked anywhere else beside filter button
            onclick: ( e ) =>
            {
                const dropy = document.querySelector( "#dropy" );

                if ( dropy && dropy.classList.contains( "show" ) && !e.target.classList.contains( "dropbtn" ) )
                {
                    dropy.classList.remove( "show" );
                }

            }
        }, [
            m(
                "div.navbar-fixed",
                m(
                    "nav",
                    m( "div.nav-wrapper", [
                        m(
                            "a.brand-logo[href='#!']",
                            { width: "42px" },
                            m( "img", {
                                src: "img/jobify.png",
                                width: "40px",
                            } )
                        ),
                        m(
                            "a.sidenav-trigger",
                            { "data-target": "mobile-demo" },
                            m( "i.material-icons", "menu" )
                        ),
                        m( "ul.right.hide-on-med-and-down", menubar ),
                    ] )
                )
            ),
            // .sidenav-close class for SPA
            m( "ul#mobile-demo.sidenav.sidenav-close", menubar ),

            m( "section#opcls", vnode.children ),
            m(
                "div.footer",
                m( "p.row#ftrlnks", [
                    m(
                        "span.col.s4.material-icons.lnklft",
                        {

                            onclick: () => layout.backbtnhandle(),
                        },
                        "arrow_back"
                    ),

                    m( "span.col.s4.lnkryt",
                        m( "a",
                            { href: 'https://github.com/rez433' },
                            "@rez433"
                        )
                    ),

                    m( "span.col.s4.material-icons#upbtn", {
                        onclick: () =>
                        {
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }
                    }, "arrow_upward" )
                ] )
            ),
        ] );
    },
};

export { layout };
