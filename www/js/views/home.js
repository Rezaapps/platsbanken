import m from "mithril";
import { adsTable } from './adsTable';
 
const home = {
    loc: "",
    job: "",
    view: () =>
    {
        return [
            m( "div", [
                m( "h1", "Jobify" ),
                m( "p", "Find your ideal job!" ),
                m(
                    "div.row.cntnr",
                    m( "form.col.s12", {
                        onsubmit: ( e ) =>
                        {
                            e.preventDefault();
                            window.open( `#!/jobs/${home.loc}&${home.job}`, "_self" );
                            adsTable.fltrd = false;
                        }
                    }, [
                        m(
                            "div.row",
                            m( "div.input-field.col.s12", [
                                m( "label[for='input_loc']", "location" ),
                                m( "br" ),
                                m(
                                    "input[id='input_loc'][type='text'][data-length='25']",
                                    {
                                        oninput: function ( e ) {
                                            home.loc = e.target.value;
                                        },
                                        value: home.loc,
                                    }
                                ),
                            ] )
                        ),
                        m(
                            "div.row",
                            m( "div.input-field.col.s12", [
                                m( "label[for='input_job']", "Job title" ),
                                m( "br" ),
                                m(
                                    "input[id='input_job'][type='text'][data-length='25']",
                                    {
                                        oninput: function ( e ) {
                                            home.job = e.target.value;
                                        },
                                        value: home.job,
                                    }
                                ),
                            ] )
                        ),
                        m( "button.btn.col.s12[type='submit'][name='action']", "Search" )
                    ] )
                ),
            ] ),
        ];
    },
};

export { home };
