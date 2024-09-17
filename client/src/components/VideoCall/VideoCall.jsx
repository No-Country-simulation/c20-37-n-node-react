import { useRef, useState } from 'react'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { Button, TextInput, Card, Select } from 'flowbite-react'

export const VideoCall = () => {
    const { logued, onCall, setOnCall } = useGeneralContext()
    const [roomName, setRoomName] = useState('')

    const role = useRef(logued?.role)
    const name = useRef(logued?.firstName + ' ' + logued?.lastName)


    const generateRoomId = () => {
        return 'room_' + Math.random().toString(36)
    }
    const startCall = () => {
        console.log(role.current, name.current, roomName)
        if (role.current === 'doctor' && !roomName) {
            setRoomName(generateRoomId())
            console.log('roomName', roomName)
        }
        if (name.current && (role.current === 'doctor' || (role.current === 'user' && roomName))) {
            console.log('start call')
            setOnCall(true)
        }
    }

    const handleJitsiIFrameRef1 = (iframeRef) => {
        iframeRef.style.height = '600px'
        iframeRef.style.width = '100%'
    }

    return (
        <Card className='w-full flex flex-col align-top items-start justify-start mx-auto bg-gray-100 dark:bg-gray-800 shadow-md'>
            <h1 className="text-3xl font-bold mb-2">Ingresar a la videollamada agendada</h1>
            <p>Para ingresar, debe escribir el nombre de la Sala que su médico definió anteriormente.</p>
            <p>En caso de no recordar el nombre, lo puede ver en los detalles de su consulta agendada.</p>
            {!onCall ? (
                <div className="flex-1 space-y-4">
                    <Select
                        disabled
                        id="role"
                        value={role.current}
                    >
                        <option value={role.current}>{role.current === 'user' ? 'Paciente' : 'Doctor'}</option>
                    </Select>
                    <TextInput
                        disabled
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name.current}
                    />
                    {role.current === 'user' && (
                        <TextInput
                            id="roomName"
                            type="text"
                            placeholder="ID de la sala"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    )}
                    <Button
                        color={'success'}
                        onClick={startCall}
                        disabled={!name.current || (role.current === 'user' && !roomName)}
                    >
                        {role.current === 'doctor' ? 'Iniciar llamada' : 'Unirse a la llamada'}
                    </Button>
                </div>
            ) : (
                <div>
                    <JitsiMeeting
                        roomName={roomName}
                        configOverwrite={{
                            startWithAudioMuted: true,
                            disableModeratorIndicator: true,
                            startScreenSharing: true,
                            enableEmailInStats: false
                        }}
                        interfaceConfigOverwrite={{
                            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
                        }}
                        userInfo={{
                            displayName: name.current
                        }}
                        onApiReady={() => {
                            // here you can attach custom event listeners to the Jitsi Meet External API
                            // you can also store it in state for later use
                        }}
                        getIFrameRef={handleJitsiIFrameRef1}
                    />
                    <p className="mt-4">ID de la sala: {roomName}</p>
                    <Button color={'failure'} onClick={() => setOnCall(false)} className="mt-4 duration-200 ">
                        Finalizar llamada
                    </Button>
                </div>
            )}
        </Card>
    )
}