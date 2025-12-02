// src/components/NotificationSnackbar.jsx

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function NotificationSnackbar({ notification, handleClose }) {
    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={notification.duration || 6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert 
                onClose={handleClose} 
                severity={notification.type || 'info'} 
                sx={{ width: '100%' }}
                aria-live="assertive" // Доступность
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
}

export default NotificationSnackbar;