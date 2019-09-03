// @flow
import { LANG_FOREIGN, LANG_RU } from './constants/setsStore';

type Attrs = {
    p?: boolean,
    r?: boolean,
    e?: string,
}

export type SetMeta = {
    comment: string,
    id: string,
    title: string,
};

export type Set = {
    id: string,
    title: string,
    body: string,
}

export type SetData = {
    id: number;
    foreign: string,
    transcription: string,
    ru: string,
    attrs?: Attrs,
    error?: string,
};

export type Language = LANG_FOREIGN | LANG_RU;

export type CurrentSetRight = SetData[];
export type CurrentSetWrong = SetData[];

export type SetsStore = {|
    sets: Set[],
    setsMeta: SetMeta[],
    language: Language,
    autoShuffle: boolean,
    currentSetData: SetData[],
    currentIterationSet: SetData[],
    currentIterationSetIndex: number,
    currentSetRight: CurrentSetRight,
    currentSetWrong: CurrentSetWrong,
|}
