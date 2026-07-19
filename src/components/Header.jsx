import PageTitle from "./PageTitle";

function Header(){
    const user = { name: "Abhishek", role: "Admin", lastLogin: "2026-07-18T09:30:00" };
    
    const formatDate = (iso) =>
        new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

    return (
        
        <header style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
            <PageTitle/>
            <div>
                {user.name} ({user.role}) — last login {formatDate(user.lastLogin)}
            </div>
        </header>
        
    );
}

export default Header;