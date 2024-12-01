import IThought from "./IThought";

interface IThoughtContext{
    thoughts: IThought[],
    getThoughtById: (id: number) => Promise<IThought | null>,
    postThought: (newThought: IThought, newThoughtImage: File | null) => Promise<IThought | null>;
    putThought: (updatedThought: IThought) => Promise<IThought | null>,
    deleteThought: (id: number) => void
}

export default IThoughtContext;