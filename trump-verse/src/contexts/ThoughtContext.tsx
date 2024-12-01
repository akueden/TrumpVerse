import {useState, useEffect, createContext, FC} from 'react';
import IThought from '../interfaces/IThought';
import IThoughtContext from '../interfaces/IThoughtContext';
import IProps from '../interfaces/IProps';
import ThoughtService from '../services/ThoughtService';

export const ThoughtContext = createContext<IThoughtContext | null>(null);

export const ThoughtProvider : FC<IProps> = ({children}) => {

    const [thoughts, setThoughts] = useState<IThought[]>([]);

    useEffect(()=>{
        getAndSetThoughtsFromService();
    }, []);

    const getAndSetThoughtsFromService = async () => {  
        try{
            const thoughtsFromService = await ThoughtService.getAll();
            console.log("API-respons:", thoughtsFromService);
            
            if(thoughtsFromService.success){
                setThoughts(thoughtsFromService.data as IThought[]);
            } else{
                console.log("Kunne ikke hente Thoughts:", thoughtsFromService.data);

            }
        } catch(e){
            console.log("Feil fra getAndSetThoughtsFromService i ThoughtContext", e);
        }
    }

    const getThoughtById = async (id: number) : Promise<IThought | null> => {  
        try{
            if( id != null && id != undefined && id.toString().length > 0 ){
                const thoughtFromService = await ThoughtService.getById(id);
                console.log(thoughtFromService);
                return thoughtFromService;
            } else{
                return null;
            }
        } catch(e){
            console.log("Feil fra getThoughtById i ThoughtContext", e);
            return null;
        }
    }

    const postThought = async (newThought: IThought, newImage: File | null) : Promise<IThought | null> => {
        try{
            const result = await ThoughtService.postThought(newThought, newImage);
            if( result != null ){
                setThoughts([result, ...thoughts]);
            } 
            return result; 
        } catch(e){
            console.log("Feil fra postThought i ThoughtContext", e);
            return null;
        }
    }

    const putThought = async (updatedThought: IThought) : Promise<IThought | null> => {
        try{
            const result = await ThoughtService.putThought(updatedThought);
            if(result != null){
                getAndSetThoughtsFromService();
                return updatedThought;
            }
            return null;
        } catch(e){
            console.log("Feil fra putThought i ThoughtContext", e);
            return null;
        }
    }

    const deleteThought = async (id: number) => {
        try{
            await ThoughtService.deleteThought(id);
            getAndSetThoughtsFromService();
        } catch(e){
            console.log("Feil fra deleteThought i ThoughtContext", e);
            return null;
        }
    }
    
    return(
        <ThoughtContext.Provider value={{thoughts, getThoughtById, postThought, putThought, deleteThought}}>
            {children}
        </ThoughtContext.Provider>
    )
}