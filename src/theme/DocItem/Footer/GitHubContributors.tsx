import React, { useState, useEffect } from 'react';
import { getContributors } from './contributors';
import styles from './contributors.module.scss';

const GitHubContributors = ({ owner, repo, filePath, additionalContributors }) => {
    const [contributors, setContributors] = useState([]);
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}`;

    useEffect(() => {
        const fetchFileContributors = () => {
            fetch(url)
                .then((response) => response.json())
                .then((commits) => {
                    const gitContributors = getContributors(commits)
                    const contributors = gitContributors.concat(additionalContributors || []);
                    setContributors(contributors);
                })
                .catch((error) => {
                    console.error(error);
                    setContributors([]);
                });
        };
        fetchFileContributors();
    }, []);

    if (!contributors.length) {
        return null;
    }

    return (
        <div className={styles.contributors}>
            <h3>Contributors</h3>

            <ul className={styles.wrapper}>
                {contributors?.map((contributor) => {
                
                    const name = contributor.login;
                    return (
                        <li
                            key={contributor.login}
                            className={styles.contributor}
                        >
                            <a
                                href={contributor.html_url}
                                title={`@${name}`}
                            >
                                <img
                                    src={contributor.avatar_url}
                                    alt={contributor.login}
                                    width={70}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GitHubContributors;
