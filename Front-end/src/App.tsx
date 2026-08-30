import Input from "./components/Input";

const App = () => {
  return (
    <div className="flex gap-2 bg-[#161410] p-6">
      <h1>Hamburgaria</h1>
      <Input placeholder="Email" type="email" />
    </div>
  );
};
export default App;
