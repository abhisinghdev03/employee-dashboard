import PageTitle from "./PageTitle";

function Header({ user }) {
  const title = "Employee Dashboard";

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 16 }}
    >
      <PageTitle title={title} />
      <div>
        {user.name} {user.role === "Admin" && (<button style={{ marginLeft: 12 }}>Manage users</button>
        )}
         — last login {formatDate(user.lastLogin)}
      </div>
    </header>
  );
}

export default Header;
