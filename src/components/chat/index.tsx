import React, { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '@/contexts/webSocketContext';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import BoardContext from '@/contexts/boardContext';

interface Message {
    name: string;
    message: string;
}
const names = ['Alice', 'Bob', 'Charlie', 'Diana'];
const sampleMessages = ['Hello there!', 'How are you?', 'Nice to meet you!', 'What’s up?'];

const Chat = () => {
    const socket = useContext(WebSocketContext);
    const { state } = useContext(BoardContext);
    const currentUser = state?.players?.find(el => el?.id === 5)
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        if (!currentUser) {
            return;
        }
        const sendMessage = () => {
            if (messages.length >= 4) {
                clearInterval(messageInterval);
                return;
            }

            const name = names[Math.floor(Math.random() * names.length)];
            const message = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
            setMessages(prevMessages => [...prevMessages, { name, message }]);
        };

        const messageInterval = setInterval(sendMessage, 3000);

        return () => clearInterval(messageInterval);
    }, [messages, currentUser]);
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected!');
        });

        socket.on('onChat', (newMessage) => {
            const newMessages = newMessage?.content?.messages;
            if (Array.isArray(newMessages)) {
                setMessages(prev => [...prev, ...newMessages]);
            } else if (newMessages) {
                setMessages(prev => [...prev, newMessages]);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('onChat');
        };
    }, [socket]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        socket.emit('sendMessage', { name: "mustafa", message: inputValue });
        setInputValue("");
    };

    return (
        <Box sx={{
            backgroundColor: "#1a1f27",

        }}>

            <Grid container height={'15rem'} sx={{
                display: 'flex', alignItems: 'flex-end', overflowY: 'auto',
                scrollbarColor: "red"
            }}>
                <Grid item xs={12} padding={2}  >
                    {messages.map((msg, index) => (
                        <Typography marginTop={1} textTransform={'capitalize'} color={'#fff'} key={index}>
                            {msg.name} :
                            {" "}
                            <Chip
                                label={msg.message}
                                component="text"
                                variant="outlined"
                                deleteIcon={<DoneIcon />}
                                size="small"
                            />
                        </Typography>
                    ))}
                </Grid>

            </Grid>
            <Grid item xs={12} sx={{
                backgroundColor: "#1f2531"
            }}>
                <Grid columnSpacing={2} justifyContent={'space-between'} container alignItems={'center'} padding={2}>
                    <Grid item flex={1.8}>
                        <TextField fullWidth placeholder='Type any message' value={inputValue} onChange={handleInputChange} />
                    </Grid>
                    <Grid item flex={0.2}>
                        <Button variant='contained' onClick={handleSendMessage}>Send</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Chat;
