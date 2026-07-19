import StatCard from "./StatCard";

function StatsSection(){
    const stats = { total: 248, active: 231, onLeave: 17 };
    const activePct = ((stats.active / stats.total) * 100).toFixed(1);

    return (
        
        <section style={{ display: "flex", gap:16, padding: 16 }}>
            <StatCard label="Total employees" value={stats.total} />
            <StatCard label="Active" value={stats.active} sub={`${activePct}% of total`} />
            <StatCard label="On leave" value={stats.onLeave} />
        </section>
        
    );
}

export default StatsSection;