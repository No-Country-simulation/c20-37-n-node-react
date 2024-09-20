/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGeneralContext } from "../../hooks/useGeneralContext";
import { useUsers } from "../../hooks/useUsersContext"
import { EditUser } from "./EditUser";
import { Table, Dropdown, TextInput, Button, Modal } from 'flowbite-react'
import { HiDotsVertical, HiPencil, HiTrash, HiSearch } from 'react-icons/hi'
import { AddUser } from "./AddUser";

export const UserList = ({ filterUsed }) => {

  const { users, setUsers } = useGeneralContext()
  const { getUsers, updateUserById, deleteUserByDni } = useUsers()
  const [selectedUser, setSelectedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleDelete = async (dni) => {

    const confirm = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirm) return alert('Operación cancelada');

    await deleteUserByDni(dni);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    await updateUserById(updatedUser._id, updatedUser);
    handleCloseModal();
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md sm:p-5 w-full">
      <h1 className="text-3xl font-bold mb-2">
        Panel de usuarios
      </h1>
      <p className="mb-4">*Gestion de usuarios, editar roles y eliminar usuarios.</p>
      <div className="flex align-middle justify-center items-center">
        <HiSearch className="text-gray-500 dark:text-gray-400 size-10" />
        <TextInput
          id="search"
          type="text"
          placeholder="Buscar por email"
          required={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full justify-between">
          <Button size={'xs'} className="ml-2 bg-primary hover:bg-primaryHover" onClick={() => getUsers()}>Recargar lista</Button>
          <Button size={'xs'} className="ml-2 bg-primary hover:bg-primaryHover" onClick={() => setShowAddModal(true)}>Agregar usuario</Button>
        </div>
      </div>
      <div className="overflow-x-auto my-2">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Apellido</Table.HeadCell>
            <Table.HeadCell>Rol</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Acciones</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()))
              .filter((user) => user.role.toLowerCase().includes(filterUsed))
              .map((user) => (
                <Table.Row key={user.email} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.status === true ? 'Activo' : 'Inactivo'}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      label="Dropdown right start" placement="right-start"
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <button className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                          <HiDotsVertical className="w-5 h-5" />
                        </button>
                      )}
                    >
                      <Dropdown.Item icon={HiPencil} onClick={() => handleEditClick(user)}>
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item icon={HiTrash} onClick={() => handleDelete(user.dni)}>
                        Eliminar
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      {selectedUser && (
        <EditUser
          show={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      {showAddModal &&
        <Modal className="mx-auto" size="7xl" onClose={() => setShowAddModal(false)} show={showAddModal}>
          <Modal.Header>Creacion de usuarios</Modal.Header>
          <Modal.Body>
            <AddUser />
          </Modal.Body>
        </Modal>
      }
    </section >
  )
}
