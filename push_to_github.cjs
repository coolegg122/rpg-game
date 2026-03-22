const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const dir = '.';

async function run() {
  const repoUrl = process.argv[2];
  const username = process.argv[3];
  const token = process.argv[4];

  if (!repoUrl || !username || !token) {
    console.log("Usage: node push_to_github.cjs <repoUrl> <username> <token>");
    console.log("\nExample:");
    console.log("  node push_to_github.cjs https://github.com/myuser/myrepo.git myuser ghp_myToken12345");
    process.exit(1);
  }

  try {
    // 1. Initialize repository if .git doesn't exist
    if (!fs.existsSync(path.join(dir, '.git'))) {
      console.log("Initializing git repository...");
      await git.init({ fs, dir });
    }

    // 2. Stage all files
    console.log("Staging files (respecting .gitignore)...");
    await git.add({ fs, dir, filepath: '.' });

    // 3. Commit
    console.log("Committing changes...");
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: username,
        email: `${username}@users.noreply.github.com`
      },
      message: 'Initial commit'
    });
    console.log(`Commit created: ${sha}`);

    // 4. Add Remote or update if exists
    console.log(`Setting remote to: ${repoUrl}`);
    try {
      await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });
    } catch (e) {
      console.log("Remote 'origin' already exists, using it.");
    }

    // 5. Push
    console.log("Pushing to GitHub (main branch)...");
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'refs/heads/main',
      force: true, // Forces initial push
      onAuth: () => ({ username, password: token })
    });

    if (pushResult.ok) {
      console.log("\n✅ Successfully pushed to GitHub!");
    } else {
      console.error("\n❌ Push failed:", pushResult);
    }
  } catch (err) {
    console.error("\n❌ Error during operations:", err);
  }
}

run();
