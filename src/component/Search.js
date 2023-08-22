
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const Search = styled('div')(({ theme }) => ({
    display:'flex', 
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, ),
    },
    marginTop:20,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    color:'#fff',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
 export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:0,
  }));
  
 export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    marginLeft:0,
    border:'1px solid #ccc',
    borderRadius:8,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));