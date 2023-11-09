import React from "react";
import { Link } from "react-router-dom";

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
