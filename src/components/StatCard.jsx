function StatCard({label, value, sub}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <p style={{ margin: 0, color: "#666" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>{value}</p>
      {sub && <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{sub}</p>}
    </div>
  );
}

export default StatCard;