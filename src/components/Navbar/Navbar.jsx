import { AppBar, Button } from '@mui/material';
import { Box } from '@react-three/drei';
import React from 'react';

const Navbar = () => {
    return (
        <div>
             <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 }}>
                <Box >
                <Button sx={{color:"#fff"}} >Test</Button>
                <Button sx={{color:"#fff"}} >Test</Button>
                <Button sx={{color:"#fff"}} >Test</Button>
                </Box>
             </AppBar>
        </div>
    );
};

export default Navbar;