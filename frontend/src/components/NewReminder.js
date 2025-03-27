import React, { useState } from 'react';



const NewReminder = ({onClose, onSubmit}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => { 
        e.preventDefault();

        const reminder = {
            title: title,
            createdBy: "System",
            reminderTime: date,
            description: description,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
            status: "active",
            isRecurring: false,
            frequency: null,
            recurrenceEnd: null
        }
        onSubmit(reminder)
    }


    return (
        <div className='new-reminder'>
            <form onSubmit={handleSubmit} className='new-reminder-inner'>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Enter reminder title"
                    />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter reminder details"
                    ></textarea>
                </div>

                {/* Date Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Due Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save Reminder
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewReminder;