"use client"

import { useState } from "react"
import { Button, Label, TextInput, Textarea, Card, Modal } from "flowbite-react"

export function ClinicalList() {
  const [medicalHistory, setMedicalHistory] = useState([
    { id: 1, date: "2023-05-15", diagnosis: "Resfriado común", description: "El paciente presentó síntomas de resfriado común. Se recetó descanso y medicamentos de venta libre." },
    { id: 2, date: "2023-07-22", diagnosis: "Esguince de tobillo", description: "El paciente sufrió un esguince leve en el tobillo derecho. Se recomendó el método RICE y se proporcionó una venda de compresión." },
  ])

  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (record) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Registros Médicos del Paciente</h1>
      <Card>
        <h5 className="text-xl font-bold mb-4">Historial</h5>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {medicalHistory.map((record) => (
            <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">{record.diagnosis}</h3>
              <p className="text-sm text-gray-600">Fecha: {record.date}</p>
              <p className="mt-2 mb-2">{record.description.substring(0, 100)}...</p>
              <Button size="sm" onClick={() => openModal(record)}
                className="bg-blue-700 hover:bg-blue-800">
                Ver detalles
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        className="w-full md:w-1/2"
        show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Detalles del Diagnóstico</Modal.Header>
        <Modal.Body>
          {selectedRecord && (
            <div>
              <h3 className="text-lg font-semibold mb-2">{selectedRecord.diagnosis}</h3>
              <p className="text-sm text-gray-600 mb-4">Fecha: {selectedRecord.date}</p>
              <p>{selectedRecord.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-red-700 hover:bg-red-800"
            onClick={() => setIsModalOpen(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}