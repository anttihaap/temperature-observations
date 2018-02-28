import React from "react";
import Header from "./header/Header";

export default class Layout extends React.Component {
    render = () => {
        return (
            <div>
                <div className="container">
                    <Header />
                    <main>
                        {this.props.children}
                    </main>
                    <footer>&#8203;</footer>
                </div>
                
            </div>
        );
    }
}
