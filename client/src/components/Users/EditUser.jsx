/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

export const EditUser = ({ show, onClose, onSave, user }) => {
    const [editedUser, setEditedUser] = useState(user);
    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
    };
    return (
        <Modal className='mx-auto' size="6xl" show={show} onClose={onClose}>
            <Modal.Header>Editar Usuario</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="firstName" value="Nombre" />
                        <TextInput
                            id="firstName"
                            name="firstName"
                            value={editedUser.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" value="Apellido" />
                        <TextInput
                            id="lastName"
                            name="lastName"
                            value={editedUser.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="role" value="Rol" />
                        <Select
                            id="role"
                            name="role"
                            value={editedUser.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Medico</option>
                            <option value="User">Paciente</option>
                        </Select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
                <Button color="success" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}