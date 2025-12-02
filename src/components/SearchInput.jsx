// src/components/SearchInput.jsx

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchInput({ searchQuery, onSearchChange, resultCount }) {
    return (
        <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Поиск технологий
            </Typography>
            <TextField
                fullWidth
                label="Найти по названию или описанию..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
                aria-label="Поле ввода для поиска технологий"
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Найдено результатов: {resultCount}
            </Typography>
        </Box>
    );
}

export default React.memo(SearchInput);