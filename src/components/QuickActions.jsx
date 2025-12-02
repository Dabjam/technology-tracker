// src/components/QuickActions.jsx

import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function QuickActions({ onMarkAllCompleted, onResetAllStatuses, onExportData, onImportData }) {
    return (
        <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Быстрые действия
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Button 
                        onClick={onMarkAllCompleted} 
                        variant="contained" 
                        color="success" 
                        fullWidth 
                        startIcon={<CheckCircleIcon />}
                    >
                        Завершить все
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        onClick={onResetAllStatuses} 
                        variant="contained" 
                        color="warning" 
                        fullWidth 
                        startIcon={<ReplayIcon />}
                    >
                        Сбросить все
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        onClick={onExportData} 
                        variant="outlined" 
                        color="primary" 
                        fullWidth 
                        startIcon={<CloudDownloadIcon />}
                    >
                        Экспорт (JSON)
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        component="label" 
                        variant="outlined" 
                        color="primary" 
                        fullWidth 
                        startIcon={<CloudUploadIcon />}
                        aria-label="Импорт данных из JSON файла"
                    >
                        Импорт (JSON)
                        <input 
                            type="file" 
                            hidden 
                            accept=".json" 
                            onChange={onImportData} 
                        />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default QuickActions;