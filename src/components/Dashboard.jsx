import React, { useEffect, useState } from 'react';
import { getRecipients } from '../logic/recipientLogic';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [recipients, setRecipients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const data = await getRecipients();
                setRecipients(data);
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };
        fetchRecipients();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {recipients.map(recipient => (
                    <Card key={recipient.id} sx={{ margin: 2, width: 200 }}>
                        <CardMedia
                            component="img"
                            alt={recipient.name}
                            height="140"
                            image={recipient.avatar || '/placeholder.png'}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">{recipient.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{recipient.relationship}</Typography>
                            <Button onClick={() => navigate(`/recipient/${recipient.id}`)}>View</Button>
                        </CardContent>
                    </Card>
                ))}
                <Card sx={{ margin: 2, width: 200 }}>
                    <CardMedia
                        component="img"
                        alt="Add Recipient"
                        height="140"
                        image="/add_placeholder.png"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">Add Recipient</Typography>
                        <Button onClick={() => navigate('/create-recipient')}>Add</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;