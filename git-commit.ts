import { getLastCommit } from 'git-last-commit';

getLastCommit((err, commit) => {
  // read commit object properties
  console.log(commit);
});
