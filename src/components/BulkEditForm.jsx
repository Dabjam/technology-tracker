// src/components/BulkEditForm.jsx

import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

function BulkEditForm({ selectedIds, applyBulkStatus, onClearSelection }) {
    const [newStatus, setNewStatus] = useState('');

    const handleSubmit = () => {
        if (newStatus && selectedIds.length > 0) {
            applyBulkStatus(selectedIds, newStatus);
            setNewStatus('');
            onClearSelection();
        }
    };

    return (
        <Box sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Массовое редактирование статусов
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Выбрано: {selectedIds.length} технологи{selectedIds.length === 1 ? 'я' : 'й'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 150 }} size="small" aria-label="Новый статус">
                    <InputLabel id="new-status-label">Установить статус</InputLabel>
                    <Select
                        labelId="new-status-label"
                        value={newStatus}
                        label="Установить статус"
                        onChange={(e) => setNewStatus(e.target.value)}
                        disabled={selectedIds.length === 0}
                    >
                        <MenuItem value="">
                            <em>Выберите статус</em>
                        </MenuItem>
                        <MenuItem value="not-started">Не начато</MenuItem>
                        <MenuItem value="in-progress">В процессе</MenuItem>
                        <MenuItem value="completed">Выполнено</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={selectedIds.length === 0 || !newStatus}
                    aria-label="Применить массовое изменение статуса"
                >
                    Применить
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClearSelection}
                    disabled={selectedIds.length === 0}
                >
                    Отменить выбор
                </Button>
            </Box>
        </Box>
    );
}

export default BulkEditForm;