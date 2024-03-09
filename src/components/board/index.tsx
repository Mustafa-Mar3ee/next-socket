import React, { ChangeEvent, useContext, useState } from 'react'
import InputWithButtons from './input-with-buttons'
import { Box, Button, Grid, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material'
import BoardContext from '@/contexts/boardContext';
import { WebSocketContext } from '@/contexts/webSocketContext';
import PreferanceContext from '@/contexts/preferancesContext';
import { marks, valuetext } from '@/helpers';



export const Board: React.FC<any> = ({ data }) => {
    const socket = useContext(WebSocketContext)
    const { state, dispatch } = useContext<any>(BoardContext);
    const { state: loader } = useContext<any>(PreferanceContext)


    const [isGameStarted, setGameStarted] = useState(false)

    const handleSliderChange = (_: any, value: number) => {
        dispatch({ type: 'speed', name: "speed", amount: value })
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <Grid container display={'flex'} spacing={2}>
            <Grid item xs={6}>
                <InputWithButtons
                    name="points"
                    amount={25}
                    title='Points'
                />
            </Grid>
            <Grid item xs={6}>
                <InputWithButtons
                    name="multiplier"
                    amount={0.25}
                    title='Multiplayer'

                />
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth sx={{
                    backgroundImage: 'linear-gradient(45deg, #e53b77, #e66451) !important',
                    '&:hover': {
                        backgroundImage: 'transparent',
                    },
                    py: 1.5,
                    fontSize: 18,
                }} style={{

                }} variant='contained' onClick={() => {

                    socket.emit('startGame', state)
                    setGameStarted(true)
                }} disabled={loader?.isLoading}>Start</Button>

            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5' color='white' fontWeight='600' sx={{ px: 2 }}>
                    Current Round
                </Typography>
                <TableContainer
                    sx={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderRadius: 3,
                        borderColor: '#2b303a',
                        mt: 2
                    }}
                    component={Paper}   >
                    <Table aria-label="customized table"   >
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell  >Points</StyledTableCell>
                                <StyledTableCell >Mulitplier</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell >{!isGameStarted ? "-" : row.points}</StyledTableCell>
                                    <StyledTableCell >{!isGameStarted ? "-" : row.multiplier}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>

                <Typography variant='h5' color='white' fontWeight='600' sx={{ px: 2 }}>
                    Speed
                </Typography>
                <Box
                    sx={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderRadius: 3,
                        borderColor: '#2b303a',
                        px: 4,
                        py: 2,
                        backgroundColor: '#1f2531',
                        mt: 2
                    }}
                >


                    <Slider
                        aria-label="Always visible"
                        defaultValue={0}
                        min={25}

                        getAriaValueText={valuetext}
                        step={25}
                        marks={marks}
                        valueLabelDisplay="on"
                        onChange={handleSliderChange}
                        disabled={loader?.isLoading}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}
