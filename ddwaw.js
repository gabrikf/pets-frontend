import "./styles.css";

const Table = (props) => {
  const heads = Object.keys(props.data[0]) || [];
  return (
    <table border="1">
      <thead>
        {heads.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </thead>
      <tbody>
        {props.data.map((item) => {
          return (
            <tr>
              {heads.map((keyName) => (
                <td>{item[keyName]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default function App() {
  const fakes = [
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      role: "Admin",
      status: "Active"
    },
    {
      id: 2,
      name: "Mary",
      email: "mary@gmail.com",
      role: "Admin"
    },
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      role: "Admin"
    },
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      role: "Admin"
    },
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      role: "Admin",
      status: "Active"
    }
  ];
  return (
    <div className="App">
      <Table data={fakes} />
    </div>
  );
}