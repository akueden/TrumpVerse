import { FC } from "react";
import IThought from "../../interfaces/IThought";
import ThoughtService from "../../services/ThoughtService";

const ThoughtItem : FC<IThought> = ({heading, content, image, category}) => {
    return (
        <article>   
            <h3>{heading}</h3>
            <p>{content}</p>
            <img src={ThoughtService.getImageEndpoint() + image}/>
            <p>{category}</p>
        </article>
    )
}

export default ThoughtItem;