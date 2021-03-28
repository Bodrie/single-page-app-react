import { Component } from 'react';
import * as petService from '../../services/petService';
import PetFormView from '../PetFormView/PetFormView';

class EditPet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            petName: '',
            description: '',
            likes: '',
        }

    }

    componentDidMount() {
        petService.getOne(this.props.match.params.petId)
            .then(pet => {
                this.setState(pet)
            });
    }

    onEditSubmitHandler(e) {
        console.log(e);
    }

    render() {
        return <PetFormView
            onSubmitHandler={this.onEditSubmitHandler.bind(this)}
            petName={this.state.name}
            setPetName={(name => this.setState({name}))}
        />
    }
}

export default EditPet;