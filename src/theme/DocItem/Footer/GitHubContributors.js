"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var contributors_1 = require("./contributors");
var contributors_module_scss_1 = require("./contributors.module.scss");
var GitHubContributors = function (_a) {
    var owner = _a.owner, repo = _a.repo, filePath = _a.filePath;
    var _b = (0, react_1.useState)([]), contributors = _b[0], setContributors = _b[1];
    var url = "https://api.github.com/repos/".concat(owner, "/").concat(repo, "/commits?path=").concat(filePath);
    (0, react_1.useEffect)(function () {
        var fetchFileContributors = function () {
            fetch(url)
                .then(function (response) { return response.json(); })
                .then(function (commits) {
                var contributors = (0, contributors_1.getContributors)(commits);
                setContributors(contributors);
            })
                .catch(function (error) {
                console.error(error);
                setContributors([]);
            });
        };
        fetchFileContributors();
    }, []);
    if (!contributors.length) {
        return null;
    }
    return (<div className={contributors_module_scss_1.default.contributors}>
            <h3>Contributors</h3>

            <ul className={contributors_module_scss_1.default.wrapper}>
                {contributors === null || contributors === void 0 ? void 0 : contributors.map(function (contributor) {
            var name = contributor.login;
            return (<li key={contributor.login} className={contributors_module_scss_1.default.contributor}>
                            <a href={contributor.html_url} title={"@".concat(name)}>
                                <img src={contributor.avatar_url} alt={contributor.login} width={70}/>
                            </a>
                        </li>);
        })}
            </ul>
        </div>);
};
exports.default = GitHubContributors;
