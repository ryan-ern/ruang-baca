import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../assets/styles/common.css";

const BreadCrumb = ({ title, pageTitle }) => {
    return (
        <React.Fragment>
            <div className="">
                <ol className="breadcrumbnav m-0 mt-3 ps-0">
                    <li className="">
                        <Link to="#" className="text-reset">
                            {pageTitle}
                        </Link>
                    </li>
                    <li className=" active"> {title}</li>
                </ol>
            </div>
        </React.Fragment>
    );
};
export default BreadCrumb;
