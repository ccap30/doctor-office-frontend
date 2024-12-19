import React, { useState, useEffect } from 'react';

const BACKEND_ENDPOINT = "http://a962405195c764b4ba01e8df35b7bf72-77735342.us-east-1.elb.amazonaws.com:3000/appointments";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });


  useEffect(() => {
    fetch(`${BACKEND_ENDPOINT}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(res => res.json())
      .then(newAppointment => setAppointments([...appointments, newAppointment]));
  };


  return (
    <div>
      <h1>Doctor's Office Appointments</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Patient Name" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
        <input placeholder="Doctor Name" value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <button type="submit">Book Appointment</button>
      </form>


      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>{appt.patientName} with Dr. {appt.doctorName} on {new Date(appt.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
