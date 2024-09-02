"use client"

import { useState } from "react"
import { Button, Label, TextInput, Textarea, Card, Modal } from "flowbite-react"

export function ClinicalList() {
  const [medicalHistory, setMedicalHistory] = useState([
    { id: 1, date: "2023-05-15", diagnosis: "Resfriado común", description: "El paciente presentó síntomas de resfriado común. Se recetó descanso y medicamentos de venta libre." },
    { id: 2, date: "2023-07-22", diagnosis: "Esguince de tobillo", description: "El paciente sufrió un esguince leve en el tobillo derecho. Se recomendó el método RICE y se proporcionó una venda de compresión." },
  ])

  const [newDiagnosis, setNewDiagnosis] = useState({
    date: "",
    diagnosis: "",
    description: "",
  })

  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDiagnosis((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newDiagnosis.date && newDiagnosis.diagnosis && newDiagnosis.description) {
      setMedicalHistory((prev) => [
        ...prev,
        { id: prev.length + 1, ...newDiagnosis },
      ])
      setNewDiagnosis({ date: "", diagnosis: "", description: "" })
    }
  }

  const openModal = (record) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Registros Médicos del Paciente</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h5 className="text-xl font-bold mb-4">Historial Médico</h5>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {medicalHistory.map((record) => (
              <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">{record.diagnosis}</h3>
                <p className="text-sm text-gray-600">Fecha: {record.date}</p>
                <p className="mt-2 mb-2">{record.description.substring(0, 100)}...</p>
                <Button size="sm" onClick={() => openModal(record)}>
                  Ver detalles
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h5 className="text-xl font-bold mb-4">Agregar Diagnóstico Médico</h5>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="date" value="Fecha" />
              <TextInput
                id="date"
                name="date"
                type="date"
                value={newDiagnosis.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="diagnosis" value="Diagnóstico" />
              <TextInput
                id="diagnosis"
                name="diagnosis"
                value={newDiagnosis.diagnosis}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <Textarea
                id="description"
                name="description"
                value={newDiagnosis.description}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>
            <Button type="submit">Agregar Diagnóstico</Button>
          </form>
        </Card>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}