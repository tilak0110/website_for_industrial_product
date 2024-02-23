/*
import React from "react";
const Footer=()=>{
return <div>Footer</div>;
};
export default Footer;
*/

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.color.footer_bg};
    color: ${({ theme }) => theme.color.white};
    padding: 20px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const Footer = () => {
    return (
        <FooterContainer>
            Footer
        </FooterContainer>
    );
};

export default Footer;




