import { Board } from '@/components/board'
import { ChartLine } from '@/components/chart'
import Chat from '@/components/chat'
import CurrentTime from '@/components/currentTime'
import InfoBox from '@/components/info'
import RankingTable from '@/components/ranking'
import Welcome from '@/components/welcome'
import BoardContext from '@/contexts/boardContext'
import PreferanceContext from '@/contexts/preferancesContext'
import { WebSocketContext } from '@/contexts/webSocketContext'
import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Index = () => {
  const [data, setData] = useState<any>()
  const [num, setNum] = useState<any>()
  const [showResult, setShowResult] = useState<any>(false)
  const socket = useContext(WebSocketContext)
  const { dispatch: dispatchLoading } = useContext(PreferanceContext)
  const { state, dispatch } = useContext(BoardContext)
  const currentUser = state?.players?.find(el => el.id === 5)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.on('gameProgress', (newMessage: any) => {


      if (newMessage?.content?.loading) {
        dispatchLoading({
          type: "setLoader",
          name: "isLoading",
          isLoading: true
        })
        setNum(newMessage?.content?.loading)
      }


    });
    socket.on('gameResult', (newMessage: any) => {
      if (newMessage?.content.result) {
        dispatchLoading({
          type: "setLoader",
          name: "isLoading",
          isLoading: false
        })
        setData(newMessage?.content.result)
        setShowResult(true)
        dispatch({
          type: 'updatePlayer',
          payload: {
            id: 5,
            updates: {
              totalPoints: newMessage?.content.result.find(el => el.id === 5)?.totalPoints
            }
          }
        });
      }



    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('gameProgress');
      socket.off('gameResult');
    };
  }, [socket]);

  return (

    <Box padding={4} sx={{
      backgroundColor: "#14181e",

    }}>

      <Grid container spacing={4} sx={{ backgroundColor: "#14181e", padding: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          {state?.players?.length < 5 ? <Welcome /> : <Board data={state?.players} />}
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <InfoBox title="Points" value={currentUser?.totalPoints || 'None'} />
            </Grid>
            <Grid item xs={4}>
              <InfoBox title="Name" value={currentUser?.name || 'None'} />
            </Grid>
            <Grid item xs={4}>
              <InfoBox title="Time" value={<CurrentTime />} />
            </Grid>

            <Grid item xs={12} justifyContent={'center'}>
              <ChartLine arr={num} />
            </Grid>


          </Grid>
        </Grid>
      </Grid>
      <Grid container display={'flex'} spacing={4} marginTop={2}  >
        <Grid item xs={4}>
          <Typography variant='h5' color='white' fontWeight='600' sx={{ px: 2, pb: 2 }}>
            Ranking
          </Typography>
          <RankingTable showResult={showResult} data={data?.sort((a, b) => b.totalPoints - a.totalPoints) || [1, 2, 3, 4, 5]} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' color='white' fontWeight='600' sx={{ px: 2, pb: 2 }}>
            Chat
          </Typography>
          <Chat />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Index
