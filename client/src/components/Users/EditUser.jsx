/* eslint-disable react/prop-types */
import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

export const EditUser = ({ show, onClose, onSave, selectedUser, setSelectedUser }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(selectedUser);
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
                            value={selectedUser.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" value="Apellido" />
                        <TextInput
                            id="lastName"
                            name="lastName"
                            value={selectedUser.lastName}
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
                            value={selectedUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="role" value="Rol" />
                        <Select
                            id="role"
                            name="role"
                            value={selectedUser.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="doctor">Medico</option>
                            <option value="user">Paciente</option>
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