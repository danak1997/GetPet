import { useIonLoading } from "@ionic/react";
import { useContext } from "react";
import PetsContext, { Pet } from "../context/pets";
import UserContext from "../context/user";
import http from "../utils/http";

const useAdoptPet = () => {
    const [user, setUser] = useContext(UserContext);
    const [petsState, setPetsState] = useContext(PetsContext);
    const [present, dismiss] = useIonLoading();

    const adoptPet = async (pet: Pet) => {
        present(`שומר את ${pet.name} לרשימה`);
        const { id: petId } = pet;
        await http('/api/user/savePet', { method: 'POST', body: JSON.stringify({ petId }) });
        const userData = await http('/api/user', { method: 'GET' });
        setTimeout(dismiss, 300);
        setUser({
            ...user,
            ...userData
        });
        setPetsState({
            ...petsState,
            pets: petsState.pets.filter((pet) => pet.id !== petId)
        });
    }

    return { adoptPet };
}

export default useAdoptPet;
