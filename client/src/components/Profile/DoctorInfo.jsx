/* eslint-disable react/prop-types */
import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { doctorSpecialties } from '../../utils/specialities';
import toast from 'react-hot-toast';

export const DoctorInfo = ({ show, onClose, handleChange, profile }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Información profesional guardada');
        // Here you would typically send the data to your backend
        onClose();
    };

    return (
        <>
            <Modal show={show} onClose={onClose}>
                <Modal.Header>Información profesional</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="licenseNumber" value="Número de licencia" />
                            <TextInput
                                id="licenseNumber"
                                name="licenseNumber"
                                value={profile.licenseNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="yearsExperience" value="Años de experiencia" />
                            <TextInput
                                id="yearsExperience"
                                name="yearsExperience"
                                type="number"
                                min={0}
                                value={profile.yearsExperience}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="professionalInfo" value="Información profesional" />
                            <Textarea
                                id="professionalInfo"
                                name="professionalInfo"
                                value={profile.professionalInfo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="specialty" value="Especialidad" />
                            <Select
                                id="specialty"
                                name="specialty"
                                value={profile.specialty}
                                onChange={handleChange}
                                required
                            >
                                {doctorSpecialties.map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button color="gray" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>Aceptar</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}