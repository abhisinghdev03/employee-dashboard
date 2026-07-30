import { useState } from "react";

const EMPTY = { firstName: "", lastName: "", department: "Engineering", active: true };

function AddEmployeeForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ ...form, id: crypto.randomUUID() });   // hand completed employee up to App
    setForm(EMPTY);                                 // reset by clearing state
  }

  const isValid = form.firstName.trim() !== "" && form.lastName.trim() !== "";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: 16, flexWrap: "wrap" }}>
      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
      <input name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last name" />
      <select name="department" value={form.department} onChange={handleChange}>
        <option>Engineering</option>
        <option>Marketing</option>
        <option>Finance</option>
      </select>
      <label>
        <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
        {" "}Active
      </label>
      <button type="submit" disabled={!isValid}>Add employee</button>
    </form>
  );
}

export default AddEmployeeForm;