/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import '../NavSidebar.css';
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StarIcon from '@material-ui/icons/Star';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';




import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if(sessionStorage.getItem("role") == "productmanager")
  {
  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      {/* <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div> */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
 
    <div className="navigationClass">
        <Navigation
          
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Product Manager",
              itemId: "/productmanager",
              elemBefore: () => <AccountBoxIcon/>,
              subNav: [
                {
                  title: "Products",
                  itemId: "/productmanager/products"
                },
                {
                  title: "Tags",
                  itemId: "/productmanager/tags"
                },
                {
                  title: "Comments",
                  itemId: "/productmanager/comments"
                }
              ]
            },
          ]}
        />
    </div>
      </div>
    </React.Fragment>
  );
}

else if (sessionStorage.getItem("role") == "salesmanager")
{
  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      {/* <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div> */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
 
    <div className="navigationClass">
        <Navigation
          
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Sales Manager",
              itemId: "/salesmanager",
              elemBefore: () => <AccountBoxIcon/>,
              subNav: [
                {
                  title: "Orders/Invoices",
                  itemId: "/salesmanager/orders"
                },
                {
                  title: "Campaigns",
                  itemId: "/salesmanager/campaigns"
                },
                {
                  title: "Status/Address Change",
                  itemId: "/salesmanager/status"
                }
              ]
            },
          ]}
        />
    </div>
      </div>
    </React.Fragment>
  );
}
else {
  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      {/* <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div> */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
 
    <div className="navigationClass">
        <Navigation 
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Special Offers",
              itemId: "/campaigns",
              elemBefore: () => <StarIcon/>,
            },
          ]}
        />
    </div>
      </div>
    </React.Fragment>
  );
}
};

export default NavSidebar;

