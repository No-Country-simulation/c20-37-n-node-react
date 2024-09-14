import { useState, useEffect, useRef } from 'react'
import { Button, TextInput, Card, Select } from 'flowbite-react'
import { useGeneralContext } from '../../hooks/useGeneralContext'


export const VideoCall = () => {

    const { onCall, setOnCall } = useGeneralContext()
    const [roomName, setRoomName] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('patient')
    const jitsiContainerRef = useRef(null)

    useEffect(() => {
        if (onCall) {
            const domain = 'meet.jit.si'
            const options = {
                roomName: roomName,
                width: '100%',
                height: 500,
                parentNode: jitsiContainerRef.current,
                userInfo: {
                    displayName: name
                }
            }

            const api = new window.JitsiMeetExternalAPI(domain, options)

            api.addEventListener('videoConferenceLeft', () => {
                setOnCall(false)
            })

            return () => api.dispose()
        }
    }, [onCall, roomName, name])

    const generateRoomId = () => {
        return 'room_' + Math.random().toString(36).substr(2, 9)
    }

    const startCall = () => {
        if (role === 'doctor' && !roomName) {
            setRoomName(generateRoomId())
        }
        if (name && (role === 'doctor' || (role === 'patient' && roomName))) {
            setOnCall(true)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <h1 className="text-2xl font-bold mb-4">Videollamada con Jitsi</h1>
                {!onCall ? (
                    <div className="space-y-4">
                        <Select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="patient">Paciente</option>
                            <option value="doctor">Médico</option>
                        </Select>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {role === 'patient' && (
                            <TextInput
                                id="roomName"
                                type="text"
                                placeholder="ID de la sala"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        )}
                        <Button onClick={startCall} disabled={!name || (role === 'patient' && !roomName)}>
                            {role === 'doctor' ? 'Iniciar llamada' : 'Unirse a la llamada'}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div ref={jitsiContainerRef} />
                        <p className="mt-4">ID de la sala: {roomName}</p>
                    </div>
                )}
            </Card>
        </div>
    )
}