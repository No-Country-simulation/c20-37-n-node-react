import { useState } from "react"
import { useUsers } from "../../hooks/useUsersContext"
import { EditUser } from "./EditUser";
import { Table, Dropdown, TextInput, Button } from 'flowbite-react'
import { HiDotsVertical, HiPencil, HiTrash, HiSearch } from 'react-icons/hi'
import { useGeneralContext } from "../../hooks/useGeneralContext";

export const UserList = ({ filterUsed }) => {

  const { users, setUsers } = useGeneralContext()
  const { getUsers, updateUserById } = useUsers()
  const [selectedUser, setSelectedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    console.log('aca se borraria el usuario con id:', id);

  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    updateUserById(updatedUser._id, updatedUser);
    getUsers();
    handleCloseModal();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Panel de usuarios
      </h1>

      {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
      {/* <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden"> */}
      <div className="flex">
        <TextInput
          id="search"
          type="text"
          icon={HiSearch}
          placeholder="Buscar por email"
          required={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="ml-2" onClick={() => getUsers()}>Recargar lista</Button>
      </div>
      <div className="overflow-x-auto">
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
                      <Dropdown.Item icon={HiTrash} onClick={() => handleDelete(user.email)}>
                        Eliminar
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      {/* </div> */}
      {/* </div > */}
      {selectedUser && (
        <EditUser
          show={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </section >
  )
}
