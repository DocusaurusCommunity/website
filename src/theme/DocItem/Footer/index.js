"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Footer_1 = require("@theme-original/DocItem/Footer");
var internal_1 = require("@docusaurus/theme-common/internal");
var GitHubContributors_1 = require("./GitHubContributors");
var git_url_parse_1 = require("git-url-parse");
function FooterWrapper(props) {
    var metadata = (0, internal_1.useDoc)().metadata;
    var file = metadata.editUrl;
    if (!file) {
        return <Footer_1.default {...props}/>;
    }
    var info = (0, git_url_parse_1.default)(file);
    var name = info.name, owner = info.owner, filepath = info.filepath;
    return (<>
          <Footer_1.default {...props}/>
          <GitHubContributors_1.default repo={name} owner={owner} filePath={filepath}/>
      </>);
}
exports.default = FooterWrapper;
