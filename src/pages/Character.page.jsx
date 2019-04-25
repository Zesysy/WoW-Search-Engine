import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import ButtonHome from "../components_home/ButtonLinkHome";
import CharacterComponent from "../components_character/CharacterComponent";
import ModalForm from "../components_home/ModalForm.jsx";

class ResultSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterSearch: [],
            isLoading: false,
            isError: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        Axios.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=hyjal&name=&fields=gear`)
            .then(res => {
                this.setState({ characterSearch: res.data, isLoading: false });
            })
            .catch(() => this.setState({ isError: true, isLoading: false }));
    }
    render() {
        // const characterNamefilter = this.props.match.params.filter;
        const { characterSearch, isError, isLoading } = this.state;
        if (isError) {
            return <Redirect to="/" />;
        }
        if (isLoading) {
            return <Spinner animation="border" variant="danger" />;
        }
        return (
            <>
                <ButtonHome />
                <CharacterComponent {...characterSearch} />

                <footer>
                    <ModalForm />
                    <p className="FooterCSS">Website by Sylène, Stéphane and Enzo.</p>
                </footer>
            </>
        );
    }
}

export default ResultSearch;