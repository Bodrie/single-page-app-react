import { useEffect, useState } from 'react';
import * as petService from '../../services/petService';

import InputError from '../Shared/InputError';

const EditPetDetails = ({ match , history }) => {

    const [pet, setPet] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        petService.getOne(match.params.petId)
            .then(res => setPet(res));
    }, []);

    const onDescriptionSaveSubmit = (e) => {
        e.preventDefault();

        let petId = match.params.petId;
        let updatedPet = {...pet, description: e.target.description.value};

        petService.update(match.params.petId, updatedPet)
            .then(() => {
                history.push(`/pets/details/${petId}`);
                return;
            })
    };

    const onDescriptionChangeHandler = (e) => {
        if(e.target.value.length < 10) {
            setErrorMessage('Description is TOO short...')
        } else {
            setErrorMessage('');
        }
    };

    return (
        <section className="detailsMyPet">
            <h3>{pet.name}</h3>
            <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
            <p className="img"><img src={pet.imageURL} />
            </p>
            <form onSubmit={onDescriptionSaveSubmit}>
                <textarea type="text" name="description" onBlur={onDescriptionChangeHandler} defaultValue={pet.description}></textarea>
                <InputError>{errorMessage}</InputError>
                <button className="button"> Save</button>
            </form>
        </section>
    );
};

export default EditPetDetails;