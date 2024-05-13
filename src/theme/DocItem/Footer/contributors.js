"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContributors = void 0;
var getContributors = function (commits) {
    // filter out commits that don't have an author
    var commitsWithAuthors = commits.filter(function (commit) { return !!commit.author; });
    // use a Set to deduplicate the list of contributors
    var contributorSet = new Set();
    for (var _i = 0, commitsWithAuthors_1 = commitsWithAuthors; _i < commitsWithAuthors_1.length; _i++) {
        var commit = commitsWithAuthors_1[_i];
        contributorSet.add(JSON.stringify(commit.author));
    }
    var contributors = Array.from(contributorSet).map(function (str) {
        var contributor = JSON.parse(str);
        var login = contributor.login, html_url = contributor.html_url, avatar_url = contributor.avatar_url;
        return { login: login, html_url: html_url, avatar_url: avatar_url };
    });
    // sort alphabetically
    contributors.sort(function (a, b) {
        return a.login.localeCompare(b.login);
    });
    return contributors;
};
exports.getContributors = getContributors;
