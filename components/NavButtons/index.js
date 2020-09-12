import React from 'react';

const NavButton = ({ router, text, routerPath, menuStyle }) => (
    <div className="nav-button d-flex align-items-center justify-content-center non-selectable">
        <div
            onClick={() => router.push(routerPath)}
        >
            <span style={menuStyle}>{text}</span>
        </div>
    </div>
);

export default NavButton;
