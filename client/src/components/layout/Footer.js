import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-dark text-white mt-5 p-4 text-center">
                Copyright &copy; {new Date().getFullYear()} Social Developer
            </footer>
        );
    }
}

export default Footer;
