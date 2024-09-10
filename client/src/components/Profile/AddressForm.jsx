/* eslint-disable react/prop-types */
import { Modal, Label, TextInput, Select, Button } from 'flowbite-react';
import { countries } from '../../utils/countries';
import toast from 'react-hot-toast';

export const AddressForm = (({ show, onClose, handleAddress, addressInfo }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Dirección guardada correctamente');
        toast.success('Para finalizar la edición, presione Actualizar Perfil');
        onClose();
    }
    return (
        <Modal className='roboto' show={show} onClose={onClose}>
            <Modal.Header>Ingrese su dirección</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="street" value="Calle" />
                        </div>
                        <TextInput value={addressInfo?.street} onChange={handleAddress} name='street' id="street" type="text" placeholder="Ingrese su calle" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="Ciudad" />
                        </div>
                        <TextInput value={addressInfo?.city} onChange={handleAddress} name='city' id="city" type="text" placeholder="Ingrese su ciudad" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="country" value="País" />
                        </div>
                        <Select value={addressInfo?.country} name='country' onChange={handleAddress} id="country" required>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="state" value="Estado/Provincia" />
                        </div>
                        <TextInput value={addressInfo?.state} onChange={handleAddress} name='state' id="state" type="text" placeholder="Ingrese su estado o provincia" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="zip" value="Código Postal" />
                        </div>
                        <TextInput value={addressInfo?.zip} onChange={handleAddress} name='zip' id="zip" type="text" placeholder="Ingrese su código postal" />
                    </div>
                    <Button onClick={handleSubmit} color="success">Guardar</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button color={'red'} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
)
