import { useState } from 'react'
import { Card, Label, TextInput, Button, Datepicker } from 'flowbite-react'

export const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        birthdate: new Date(),
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleDateChange = (date) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            birthdate: date
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Profile updated:', profile)
        // Here you would typically send the data to your backend
    }

    const viewMedicalHistory = () => {
        console.log('Viewing medical history')
        // Here you would typically navigate to a medical history page or open a modal
    }

    return (
        <Card className="max-w-lg mx-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Edit Profile
            </h5>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstName" value="First Name" />
                    </div>
                    <TextInput
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Last Name" />
                    </div>
                    <TextInput
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone number" />
                    </div>
                    <TextInput
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="123-456-7890"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Address" />
                    </div>
                    <TextInput
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, Country"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birthdate" value="Birthdate" />
                    </div>
                    <Datepicker
                        id="birthdate"
                        name="birthdate"
                        onSelectedDateChanged={handleDateChange}
                        required
                    />
                </div>
                <Button type="submit">
                    Update Profile
                </Button>
            </form>
            <div className="mt-4">
                <Button color="success" onClick={viewMedicalHistory} className="w-full">
                    View Medical History
                </Button>
            </div>
        </Card>
    )
}
