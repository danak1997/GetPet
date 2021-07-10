import { useIonLoading } from "@ionic/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import http from "../utils/http";

export type Pet = {
    id: string,
    name: string,
    description: string,
    profilePhoto: string,
    tags: string[],
    updatedAt: string
}

export type PetsState = {
    pets: Pet[];
    lastUpdate?: Date;
}

type PetCtx = [PetsState, Dispatch<SetStateAction<PetsState>>];

const PetsContext = createContext<PetCtx>([{
    pets: []
}, () => {}]);

export const usePets = (): PetCtx => {
    const [petsState, setPetsState] = useContext(PetsContext);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        (async () => {
            present('טוען חיות');
            const result = await http('/api/pets/adoption', { method: 'GET' });
            setPetsState({ pets: result, lastUpdate: new Date() });
            setTimeout(dismiss, 500);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPetsState]);

    return [petsState, setPetsState];
}

export default PetsContext;
