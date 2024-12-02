interface IThought{
    id?: number,
    heading: string,
    content: string,
    image?: string | File | null,
    category: string
}

export default IThought;