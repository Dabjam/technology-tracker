// src/components/FilterControls.jsx

import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const FILTERS = [
    { label: 'Все', value: 'all' },
    { label: 'Не начато', value: 'not-started' },
    { label: 'В процессе', value: 'in-progress' },
    { label: 'Выполнено', value: 'completed' },
];

function FilterControls({ activeFilter, onFilterChange }) {
    return (
        <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Фильтр по статусу
            </Typography>
            <Grid container spacing={1}>
                {FILTERS.map(filter => (
                    <Grid item key={filter.value} xs={6} sm={3}>
                        <Button
                            fullWidth
                            variant={activeFilter === filter.value ? 'contained' : 'outlined'}
                            onClick={() => onFilterChange(filter.value)}
                            color="primary"
                            size="small"
                        >
                            {filter.label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default FilterControls;