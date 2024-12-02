import {useState, ChangeEvent, useContext, useEffect} from 'react'
import ThoughtList from './ThoughtList'
import IThoughtContext from '../../interfaces/IThoughtContext'
import { ThoughtContext } from '../../contexts/ThoughtContext'
import ThoughtService from '../../services/ThoughtService'
import IThought from '../../interfaces/IThought'

const RegisterThought = () => {

    const {postThought} = useContext(ThoughtContext) as IThoughtContext;

    const [thought, setThought] = useState<IThought[]>([]);
    
    const [heading, setHeading] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [category, setCategory] = useState<string>("");

    useEffect(()=>{
        getThoughtsFromService();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "heading":
                setHeading(e.target.value);
            break;
            case "content":
                setContent(e.target.value);
            break;
            case "image":
                if(e.target.files && e.target.files[0]){ // Bilde kan være null
                    const file = e.target.files[0];
                    setImage(file);
                } 
            break;
            case "category":
                setCategory(e.target.value);
        }
    }

    const registerThought = async () => {

        const newThought = {
            heading: heading,
            content: content,
            image: image?.name,
            category: category
        };
        
        postThought(newThought, image);
        await getThoughtsFromService(); 
    }

    const getThoughtsFromService = async () => {
        try{        
            const thoughtsFromService = await ThoughtService.getAll();

            console.log("FRA SERVICE", thoughtsFromService);

            if( thoughtsFromService.success === true && Array.isArray(thoughtsFromService.data)){            
                setThought(thoughtsFromService.data as IThought[]);
            }else if( thoughtsFromService.success === false ){
                console.log("API returnerte ugyldige data:", thoughtsFromService.data);
                setThought([]);
            }        
        } catch(e){
            console.log("Feil i getAndSetThoughtsFromService:", e);
            setThought([]);
        }
    }

    return (
        <section>
            <header>
                <h1>Hva tenker du på i dag....</h1>
            </header>
            <section>
                <div>
                    <label>Overskrift:</label>
                    <input name='heading' type="text" value={heading} onChange={handleChange}/>
                </div>
                <div>
                    <label>Innhold:</label>
                    <input name='content' type="text" value={content} onChange={handleChange}/>
                </div>
                <div>
                    <label>Bilde:</label>
                    <input name="image" type="file" onChange={handleChange}/> 
                </div>
                <div>
                    <label>Kategori:</label>
                    <input name='category' type="text" value={category} onChange={handleChange}/>
                </div>
                <button onClick={registerThought}>Legg ut innlegg</button>
            </section>     
            {thought.length > 0 ? <ThoughtList/>:<p>Ingen innlegg å vise...</p>}
        </section>
    )
}

export default RegisterThought;
