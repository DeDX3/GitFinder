import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./../../api/api";
import "./UserDetails.css";

export default function UserDetails() {
  const { username } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    let data = await cacheFetch(`/users/${username}`);
    setCurrentUser(data);
    console.log("USER DATA: ", data);
  };

  const parseRepo = (rawData) => {
    let repoList = [];
    rawData.map((r) => {
      let simplifiedRepo = {
        id: r.id,
        name: r.name,
        stars: r.stargazers_count,
        description: r.description,
      };
      repoList.push(simplifiedRepo);
    });
    return repoList;
  };

  const getRepoList = async () => {
    let data = await cacheFetch(`/users/${username}/repos`);
    setRepoData(parseRepo(data));

    console.log("REPO DATA: ", data);
  };

  const cacheFetch = async (url) => {
    let data = localStorage.getItem(url);
    if (data) {
      console.log("LS DATA", data);
      return JSON.parse(data);
    } else {
      try {
        const response = await api.get(url);
        localStorage.setItem(
          `https://api.github.com${url}`,
          JSON.stringify(response.data)
        );
        console.log("RES DATA: ", response.data);
        setIsLoading(false);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserData();
    getRepoList();
  }, []);

  return (
    <div className="page-wrap user-details-page">
      {!isLoading && (
        <div className="user-info-card">
          <div className="user-img">
            <img src={currentUser.avatar_url} alt={currentUser.name} />
          </div>
          <div className="user-info-content pr-2">
            <h2 className="user-name mb-2">
              {currentUser.name} ({currentUser.login})
            </h2>

            {currentUser.bio && <p className="mb-3">{currentUser.bio}</p>}
            {currentUser.location && (
              <div className="display-flex align-items-center mb-2">
                <i className="ri-map-pin-2-line mr-3"></i>
                {currentUser.location}
              </div>
            )}

            <div className="display-flex align-items-center">
              <i className="ri-group-line mr-3"></i>
              <span className="mr-2">Followers: {currentUser.followers}</span>
              <span>Following: {currentUser.following}</span>
            </div>
          </div>

          <a
            href={currentUser.html_url}
            target="_blank"
            className="user-git-link link"
          >
            <i className="ri-github-fill"></i>
          </a>
        </div>
      )}

      <div className="repo-list-wrap">
        <h3 className="mb-3">Repositories</h3>
        <div className="repo-list">
          {!isLoading &&
            repoData.map((repo) => {
              return (
                <button key={repo.id} className="repo-list-item">
                  <div className="repo-item-top">
                    <h4 className="pr-1">{repo.name}</h4>
                    <span className="display-flex align-items-center flex-shrink-0">
                      <i className="ri-star-line mr-2"></i>
                      <span>{repo.stars}</span>
                    </span>
                  </div>
                  {!isLoading && repo.description && (
                    <p className="repo-item-desc">{repo.description}</p>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
