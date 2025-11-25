import { Card, CardContent, Typography, Chip, Box, CardActionArea } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function TechnologyCardMui({ title, description, status }) {
  const statusConfig = {
    'completed': { color: 'success', icon: <CheckCircleIcon />, label: 'Завершено' },
    'in-progress': { color: 'primary', icon: <ScheduleIcon />, label: 'В процессе' },
    'not-started': { color: 'warning', icon: <HourglassEmptyIcon />, label: 'Не начато' },
  };
  const config = statusConfig[status] || statusConfig['not-started'];

  return (
    <CardActionArea sx={{ height: '100%' }}> 
        <Card 
            variant="outlined" 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: 3, 
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Chip 
                        label={config.label} 
                        color={config.color} 
                        icon={config.icon} 
                        size="small" 
                        variant="outlined"
                    />
                </Box>
            </CardContent>
        </Card>
    </CardActionArea>
  );
}

export default TechnologyCardMui;