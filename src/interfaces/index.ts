import { ReactNode } from "react";



export interface Player {
    id: number;
    name: string;
    points: number;
    multiplier: number;
    totalPoints: number;
}

export interface State {
    speed: number;
    players: Player[];
}

export interface BoardProviderProps {
    children: ReactNode;
}
