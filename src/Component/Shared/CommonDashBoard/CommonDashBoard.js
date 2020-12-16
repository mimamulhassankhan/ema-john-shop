import React, { useState } from 'react';
import {  Image, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt, faList, faComment, faPlus, faLockOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../../images/logo.png';
import AddSeller from '../../SuperAdminPage/AddSeller/AddSeller';
import ViewAllCategory from '../../SuperAdminPage/ViewAllCategory/ViewAllCategory';
import ViewAllSeller from '../../SuperAdminPage/ViewAllSeller/ViewAllSeller';
import ViewAllOrder from '../../SuperAdminPage/ViewAllOrder/ViewAllOrder';
import AddProduct from '../../SellerPortal/AddProduct/AddProduct';
import ViewSellerOrders from '../../SellerPortal/ViewSellerOrders/ViewSellerOrders';
import ViewConsumerOrder from '../../ConsumerPortal/ViewConsumerOrder/ViewConsumerOrder';
import DashboardNav from '../DashboardNav/DashboardNav';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#e5e5e5',
  },
}));

const CommonDashBoard = ({role, user, addLoggedinUser}) => {
    const classes = useStyles();
    
    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [selectedOption, setSelectedOption] = useState( role === 'superAdmin' ? 'addSeller' : role === 'seller' ? 'addProduct' : 'myOrders');

    // const signOut = (e) => {
    //     e.preventDefault();
    //     handleSignOut()
    //     .then(res => {
    //         addLoggedinUser(res);
    //         sessionStorage.removeItem('token');
    //         history.replace(from);
    //     })
    //     .catch(err => console.log(err));
    // }

    return (
        <>
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <List>
                <ListItem className="py-5">
                    <Nav.Link as={Link} to={`/`} className="text-center"><Image  width={160} src={logo} alt="Group" fluid/></Nav.Link>
                </ListItem>
                <Divider/>
                {
                    role === 'superAdmin' ?
                    <>
                    <ListItem button onClick={() => setSelectedOption('addSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faPlus} /></ListItemIcon>
                        <ListItemText primary="Add Seller" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAllCategory')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="Add/View Categroies" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="View All Seller" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAdminOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="View Orders" />
                    </ListItem>
                    </> 
                    :
                    role === 'seller' ?
                    <>
                    <ListItem button onClick={() => setSelectedOption('addProduct')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Add/View Product" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewSellerOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="View Orders" />
                    </ListItem>
                    </>
                    :
                    <>
                    <ListItem button onClick={() => setSelectedOption('myOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="My Orders" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('updateInfo')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Update Info" />
                    </ListItem>
                    </>
                }
            </List>
            <Divider />
            {/* <List>
                <ListItem button onClick={signOut} as={Link} to={`/`}>
                    <ListItemIcon><FontAwesomeIcon icon={faSignOutAlt} /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List> */}
        </Drawer>
        <main className={classes.content}>
            {
                selectedOption === 'addSeller' && <AddSeller></AddSeller>
            }
            {
                selectedOption === 'viewAllCategory'&& <ViewAllCategory></ViewAllCategory>
            }
            {
                selectedOption === 'viewSeller'&& <ViewAllSeller></ViewAllSeller>
            }
            {
                selectedOption === 'viewAdminOrders'&& <ViewAllOrder></ViewAllOrder>
            }
            {
                selectedOption === 'addProduct'&& <AddProduct></AddProduct>
            }
            {
                selectedOption === 'viewSellerOrders'&& <ViewSellerOrders></ViewSellerOrders>
            }
            {
                selectedOption === 'myOrders'&& <ViewConsumerOrder></ViewConsumerOrder>
            }
        </main>
        </div>
        </>
    );
};


export default CommonDashBoard;