// src/components/DeadlineForm.jsx

import React from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Схема валидации (Yup)
const validationSchema = yup.object({
    technologyName: yup
        .string()
        .required('Название технологии обязательно')
        .min(3, 'Минимум 3 символа'),
    deadline: yup
        .date()
        .min(new Date(), 'Срок должен быть в будущем')
        .required('Дата обязательна'),
});

function DeadlineForm() {
    const formik = useFormik({
        initialValues: {
            technologyName: '',
            deadline: new Date().toISOString().split('T')[0], // Сегодняшняя дата
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            alert(`Срок для ${values.technologyName} установлен до ${values.deadline}`);
            resetForm();
        },
    });

    return (
        <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }} component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Установка сроков изучения
            </Typography>

            {/* Поле Название Технологии */}
            <TextField
                fullWidth
                id="technologyName"
                name="technologyName"
                label="Название технологии"
                value={formik.values.technologyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.technologyName && Boolean(formik.errors.technologyName)}
                helperText={formik.touched.technologyName && formik.errors.technologyName}
                margin="normal"
                variant="outlined"
                aria-required="true" // ARIA-атрибут
            />

            {/* Поле Срок (Дата) */}
            <TextField
                fullWidth
                id="deadline"
                name="deadline"
                label="Срок"
                type="date"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                helperText={formik.touched.deadline && formik.errors.deadline}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                aria-required="true" // ARIA-атрибут
            />
            
            {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
                 <Alert severity="error" sx={{ mt: 2 }} aria-live="assertive">
                    Пожалуйста, исправьте ошибки в форме.
                </Alert>
            )}

            <Button 
                color="primary" 
                variant="contained" 
                fullWidth 
                type="submit" 
                sx={{ mt: 2 }}
            >
                Установить срок
            </Button>
        </Box>
    );
}

export default DeadlineForm;