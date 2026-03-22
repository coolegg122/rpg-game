const { execSync } = require('child_process');

try {
  console.log("Running npm run build...");
  const output = execSync('npm run build', { stdio: 'pipe' });
  console.log("Build Success!");
  console.log(output.toString());
} catch (err) {
  console.error("\n❌ Build Failed with error:");
  if (err.stdout) console.log("STDOUT:\n" + err.stdout.toString());
  if (err.stderr) console.error("STDERR:\n" + err.stderr.toString());
}
