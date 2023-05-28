export type IShuffle = {
    id: string;
    title: string;
}

export type IGameRound = {
    previouslyRound: boolean | null;
    image: string;
    round: number;
    shuffle: IShuffle[]
}
