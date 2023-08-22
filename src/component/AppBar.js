import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Logo from '../images/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BadgeIcon from '@mui/icons-material/Badge';
import Home from '../pages/personel/Home';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BugReportIcon from '@mui/icons-material/BugReport';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const switchPage =(key)=>{
  let url=key.split("/");
  let sayfa='';
  if(key==='/'){
    sayfa='/'
  }
else if(url.length===2){
  sayfa='/';
}
else{
  sayfa=url[url.length-1];
}
  switch(sayfa){
    case '/':
      return 'Ana Sayfa';

    case 'proje':
      return 'Projeler';
    
    case 'personel':
      return 'Personel';
      
    case 'log':
      return 'Log';  

    default:
      break;    
  }


}

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location=useLocation();

  const {setUser,setRole,role}=useAuth();
  const navigate=useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout= ()=>{
    setUser(null);
    setRole(0);
    localStorage.setItem("user-email","false");
    localStorage.setItem("role","false");
    navigate("/auth/login");

    window.location.reload();
    
  }



  let sayfalar=[];
  let iconlar=[];
  let url=[];

  const settings=['Profil',"Çıkış Yap"]

  const sayfa_yonetici=['Ana Sayfa',"Projeler","Personel"];
  const icon_yonetici=[<HomeIcon/>,<AccountTreeIcon/>,<BadgeIcon/>];
  const url_yonetici=["/yonetici","/yonetici/proje","/yonetici/personel"];

  const sayfa_personel=["Ana Sayfa"];
  const icon_personel=[<HomeIcon/>];
  const url_personel=["/"];

  const sayfa_admin=["Ana Sayfa","Loglar"];
  const icon_admin=[<HomeIcon/>,<BugReportIcon/>]
  const url_admin=["/admin","/admin/log"];

  const sayfalama= () =>{
    switch(parseInt(localStorage.getItem("role"))){
      case 1:
        sayfalar=sayfa_personel;
        iconlar=icon_personel;
        url=url_personel;
        break;
      case 2:
        sayfalar=sayfa_yonetici;
        iconlar=icon_yonetici;
        url=url_yonetici;
        break;
      case 3:
        sayfalar=sayfa_admin;
        iconlar=icon_admin;  
        url=url_admin;  
    }
  }
    sayfalama();

  

  return (
    <Box sx={{ display: 'flex' }}>
     
      <AppBar sx={{backgroundColor:'#f2f2f2'}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
          <img src={Logo} style={{width:30}}/>  
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} >
          <Button
               
                sx={{ my: 2, color: '#6F6F6F', display: 'block',fontSize:16,fontStyle:'revert'}}
                href={location.pathname}
              >
               {switchPage(location.pathname)}
              </Button>
            </Box>
          <Box sx={{marginRight:1,display:'flex',alignItems:'center'}} >
            <IconButton sx={{alignItems:'end',alignItems:'end'} }>
              <EmailIcon sx={{color:'#808080'}}/>
            </IconButton>
          </Box>
          <Box sx={{marginRight:1}}>
            <IconButton>
              <NotificationsIcon sx={{color:'#808080'}}/>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting==="Çıkış Yap" ? handleLogout : handleCloseUserMenu}>
                  <Typography sx={{fontFamily:'sans-serif'}} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{background:'#f2f2f2'}}  open={open}>
        <DrawerHeader sx={{backgroundColor:'#f2f2f2'}}>
          <IconButton onClick={handleDrawerClose}>
          <img src={Logo} style={{width:30}}/> 
          </IconButton>
          <Typography sx={{color:'#3B3B81',marginRight:5,marginLeft:2,fontFamily:'revert-layer'}}>Project Tracking</Typography>
        </DrawerHeader>
        <Divider />
        <List sx={{backgroundColor:'#f2f2f2'}}>
          {sayfalar.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' ,color:'#808080' ,fontFamily:'sans-serif'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href={url[index]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#808080'
                  }}
                >
                 {iconlar[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List sx={{height:750,backgroundColor:'#f2f2f2'}}>
          
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,backgroundColor:'#b6b6b6',height:'100vh'}}>
        <DrawerHeader />
        <Outlet/>
      </Box>
    
    </Box>
  );
}
