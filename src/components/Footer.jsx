import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date();
    return <footer>
        <p className="mb-1 mt-3">Improve Your Typing Here! - Copyright © {currentYear.getFullYear()}</p>
        <h6>Ahmad Samim Qeyam <a href="https://github.com/qeyamsamim" target="_blank"><FaGithub /></a></h6>
    </footer>
}

export default Footer;