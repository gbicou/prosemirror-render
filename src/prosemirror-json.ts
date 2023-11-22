
export type Attrs = Record<string, any>

export type Base = {
    readonly type: string;
    readonly attrs?: Attrs;
}

export type Mark = Base

export type Node = Base & {
    readonly marks?: Mark[];
    readonly content?: Node[];
    readonly text?: string;
}
