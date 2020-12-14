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

    const [selectedOption, setSelectedOption] = useState( role === 'superAdmin' ? 'addCategory' : role === 'seller' ? 'addProduct' : 'myOrders');

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
                    <ListItem button onClick={() => setSelectedOption('addCategory')}>
                        <ListItemIcon><FontAwesomeIcon icon={faLockOpen} /></ListItemIcon>
                        <ListItemText primary="Add Category" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('addSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faPlus} /></ListItemIcon>
                        <ListItemText primary="Add Seller" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAllCategory')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="View Categroies" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="View All Seller" />
                    </ListItem>
                    </> 
                    :
                    role === 'seller' ?
                    <>
                    <ListItem button onClick={() => setSelectedOption('addProduct')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Add Product" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAllProduct')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="View All Products" />
                    </ListItem>
                    </>
                    :
                    <>
                    <ListItem button onClick={() => setSelectedOption('myOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="My Orders" />
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
            {/* {
                selectedOption === 'servicelist'&& <ServiceConsumed></ServiceConsumed>
            }
            {
                selectedOption === 'reviews'&& <GiveReview></GiveReview>
            }
            {
                selectedOption === 'adminservicelist'&& <AdminServiceList></AdminServiceList>
            }
            {
                selectedOption === 'addservice'&& <AddService></AddService>
            }
            {
                selectedOption === 'makeadmin'&& <MakeAdmin></MakeAdmin>
            } */}
        </main>
        </div>
        </>
    );
};


export default CommonDashBoard;