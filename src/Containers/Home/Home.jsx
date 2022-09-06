import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    navigate(`/${username}`);
  };

  return (
    <div className="page-wrap home-page">
      <form className="user-search-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="custom-input"
            autoComplete="off"
            autoFocus
            required
          />
        </div>

        <button className="custom-btn">Search!</button>
      </form>
    </div>
  );
}
