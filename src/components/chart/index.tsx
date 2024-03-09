import { Box, Typography } from "@mui/material";
import {
    Line,
    XAxis,
    YAxis,
    Legend,
    ComposedChart,
    ReferenceDot,
    ResponsiveContainer,
} from "recharts";

export const ChartLine = ({ arr }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#1f2531',
                borderWidth: 1,
                borderColor: '#2b303a',
                borderStyle: 'solid',
                borderRadius: 4,
                paddingY: 6,
                width: '100%',
                maxWidth: '1100px',
                position: 'relative',
            }}
        >
            <ResponsiveContainer width="100%" aspect={1.2}>
                <ComposedChart
                    data={arr}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis tickCount={11} dataKey="X_coord" type="number" domain={[0, 10]} />
                    <YAxis hide type="number" domain={[0, 10]} />
                    <Line
                        stroke="#f45552"
                        strokeWidth={4}
                        type="monotone"
                        dataKey="Y_coord"
                        connectNulls
                        dot={false}
                        isAnimationActive={true}
                    />
                    <Legend
                        verticalAlign="middle"
                        align="center"
                        height={150}
                        content={() => (
                            <Box>
                                <Typography
                                    fontWeight={'600'}
                                    color='white'
                                    variant="h2"
                                    textAlign={"center"}
                                    sx={{
                                        textShadow: "#FFF 1px 0 3px"
                                    }}
                                >
                                    {arr?.[arr.length - 1] ? arr?.[arr.length - 1].Y_coord : 0}X
                                </Typography>
                            </Box>
                        )}
                    />
                    {arr?.[arr.length - 1] && (
                        <ReferenceDot
                            x={arr[arr.length - 1].X_coord}
                            y={arr[arr.length - 1].Y_coord}
                            r={10}
                            fill="#feb623"
                            stroke="none"
                        />
                    )}
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    );
}
